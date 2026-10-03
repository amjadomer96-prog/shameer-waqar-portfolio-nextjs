"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { INK, dotTexture } from "../assets";

// Soft studio reflections for the ice, generated on the GPU (no HDR download).
export function Environment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.95;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

export function Lights() {
  return (
    <>
      <hemisphereLight args={["#f3f6fa", "#7c8696", 1.15]} />
      <directionalLight position={[5, 9, 4]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-6, 3, -5]} intensity={0.55} color="#d6e2f0" />
    </>
  );
}

// Snow in world space, wrapped around the camera so it always surrounds you.
export function Snow({ count = 1300 }) {
  const camera = useThree((s) => s.camera);
  const { geo, speed } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 22;
      p[i * 3 + 1] = (Math.random() - 0.5) * 12 + 2;
      p[i * 3 + 2] = (Math.random() - 0.5) * 22;
      s[i] = 0.2 + Math.random() * 0.55;
    }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return { geo: g, speed: s };
  }, [count]);

  useFrame((state, dt) => {
    const p = geo.attributes.position.array;
    const t = state.clock.elapsedTime;
    const cx = camera.position.x;
    const cy = camera.position.y;
    const cz = camera.position.z;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      p[ix + 1] -= speed[i] * dt;
      p[ix] += Math.sin(t * 0.5 + i) * dt * 0.12;
      if (p[ix] - cx > 11) p[ix] -= 22;
      else if (p[ix] - cx < -11) p[ix] += 22;
      if (p[ix + 1] - cy < -6) p[ix + 1] += 12;
      else if (p[ix + 1] - cy > 6) p[ix + 1] -= 12;
      if (p[ix + 2] - cz > 11) p[ix + 2] -= 22;
      else if (p[ix + 2] - cz < -11) p[ix + 2] += 22;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geo} frustumCulled={false}>
      <pointsMaterial
        size={0.045}
        map={dotTexture()}
        transparent
        depthWrite={false}
        opacity={0.9}
        color="#ffffff"
        sizeAttenuation
      />
    </points>
  );
}

// Drifting nodes joined by lines when they come close: the "measurement" layer.
export function Plexus({ count = 30, center = [0, 2, 0], size = [9, 4, 7], maxDist = 2.4, opacity = 0.5 }) {
  const group = useRef(null);
  const camera = useThree((s) => s.camera);
  const [sx, sy, sz] = size;
  const half = useMemo(() => [sx / 2, sy / 2, sz / 2], [sx, sy, sz]);
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        p: new THREE.Vector3(
          (Math.random() - 0.5) * sx,
          (Math.random() - 0.5) * sy,
          (Math.random() - 0.5) * sz
        ),
        v: new THREE.Vector3(
          (Math.random() - 0.5) * 0.16,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.16
        ),
      })),
    [count, sx, sy, sz]
  );
  const maxSeg = (count * (count - 1)) / 2;
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(maxSeg * 6), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(maxSeg * 8), 4));
    return g;
  }, [maxSeg]);
  const pointGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    return g;
  }, [count]);
  const ink = useMemo(() => new THREE.Color(INK), []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g) return;
    g.visible = camera.position.distanceTo(g.position) < 26;
    if (!g.visible) return;
    for (const n of nodes) {
      n.p.addScaledVector(n.v, dt);
      if (Math.abs(n.p.x) > half[0]) n.v.x *= -1;
      if (Math.abs(n.p.y) > half[1]) n.v.y *= -1;
      if (Math.abs(n.p.z) > half[2]) n.v.z *= -1;
    }
    const pos = lineGeo.attributes.position.array;
    const col = lineGeo.attributes.color.array;
    let s = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const d = nodes[i].p.distanceTo(nodes[j].p);
        if (d > maxDist) continue;
        const a = (1 - d / maxDist) * opacity;
        pos.set([nodes[i].p.x, nodes[i].p.y, nodes[i].p.z, nodes[j].p.x, nodes[j].p.y, nodes[j].p.z], s * 6);
        col.set([ink.r, ink.g, ink.b, a, ink.r, ink.g, ink.b, a], s * 8);
        s++;
      }
    }
    lineGeo.setDrawRange(0, s * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;
    const pp = pointGeo.attributes.position.array;
    nodes.forEach((n, i) => pp.set([n.p.x, n.p.y, n.p.z], i * 3));
    pointGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group} position={center}>
      <lineSegments geometry={lineGeo} frustumCulled={false}>
        <lineBasicMaterial vertexColors transparent depthWrite={false} />
      </lineSegments>
      <points geometry={pointGeo} frustumCulled={false}>
        <pointsMaterial size={3.5} sizeAttenuation={false} color={INK} transparent opacity={0.7} />
      </points>
    </group>
  );
}
