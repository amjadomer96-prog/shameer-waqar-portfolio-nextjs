"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { frostTexture, iceMaterial, rasterizeText, roughen, smoothstep } from "../assets";
import { FINALE_Z, LOG_Z, RING_Z, world } from "../state";
import { Plexus } from "./Atmosphere";

const damp = THREE.MathUtils.damp;
const LOG_PLEXUS = [12, 5, 9];

// Ice ring the camera flies through between the archive and the log.
export function IceRing() {
  const ref = useRef(null);
  const camera = useThree((s) => s.camera);
  const geo = useMemo(
    () => roughen(new THREE.TorusGeometry(2.4, 0.42, 48, 160), { seed: 5, amount: 0.09, freq: 1.4 }),
    []
  );
  const mat = useMemo(() => iceMaterial({ thickness: 1 }), []);
  useFrame(({ clock }) => {
    const z = camera.position.z;
    ref.current.visible = z < RING_Z + 34 && z > RING_Z - 20;
    ref.current.rotation.z = clock.elapsedTime * 0.05;
  });
  return <mesh ref={ref} geometry={geo} material={mat} position={[0, 2.15, RING_Z]} />;
}

export function LogField() {
  return <Plexus count={36} center={[0, 2.6, LOG_Z]} size={LOG_PLEXUS} maxDist={2.6} opacity={0.38} />;
}

const pointVert = /* glsl */ `
  attribute vec3 aStart;
  attribute float aSeed;
  attribute float aShade;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vShade;
  varying float vAlpha;
  void main() {
    float m = smoothstep(0.0, 1.0, clamp(uMix * 1.35 - aSeed * 0.35, 0.0, 1.0));
    vec3 p = mix(aStart, position, m);
    p += 0.025 * vec3(
      sin(uTime * 1.3 + aSeed * 6.28),
      cos(uTime * 1.1 + aSeed * 12.0),
      sin(uTime * 0.9 + aSeed * 3.0)
    );
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio / -mv.z;
    vShade = aShade;
    vAlpha = clamp(uMix * 2.2 - 0.1, 0.0, 1.0);
  }
`;

const pointFrag = /* glsl */ `
  uniform vec3 uDark;
  uniform vec3 uLight;
  varying float vShade;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.18, d) * vAlpha;
    gl_FragColor = vec4(mix(uDark, uLight, vShade), a);
    #include <colorspace_fragment>
  }
`;

// "SW" as a point cloud that assembles as you arrive.
function PointMonogram() {
  const ref = useRef(null);
  const gl = useThree((s) => s.gl);
  const { geo, mat } = useMemo(() => {
    const { cells } = rasterizeText("SW", { step: 3, width: 2.7 });
    const n = cells.length * 2;
    const pos = new Float32Array(n * 3);
    const start = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    const shade = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const [x, y] = cells[i >> 1];
      pos[i * 3] = x + (Math.random() - 0.5) * 0.02;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * 0.02;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      const v = new THREE.Vector3().randomDirection().multiplyScalar(3.5 + Math.random() * 3);
      start.set([v.x, v.y + 1, v.z], i * 3);
      seed[i] = Math.random();
      shade[i] = Math.random() * Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aShade", new THREE.BufferAttribute(shade, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader: pointVert,
      fragmentShader: pointFrag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uMix: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: 26 },
        uPixelRatio: { value: 1 },
        uDark: { value: new THREE.Color("#222b38") },
        uLight: { value: new THREE.Color("#8b97a9") },
      },
    });
    return { geo: g, mat: m };
  }, []);

  useFrame(({ clock }, dt) => {
    const u = mat.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uPixelRatio.value = gl.getPixelRatio();
    const [a, b] = world.finale;
    const target = smoothstep(a, b, world.scroll);
    u.uMix.value = damp(u.uMix.value, target, 2.5, dt);
    ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.35;
  });

  return <points ref={ref} geometry={geo} material={mat} position={[0, 1.95, 0]} frustumCulled={false} />;
}

export function Finale() {
  const group = useRef(null);
  const camera = useThree((s) => s.camera);
  const floorMat = useMemo(() => {
    const bump = frostTexture().clone();
    bump.repeat.set(10, 10);
    bump.needsUpdate = true;
    return new THREE.MeshStandardMaterial({ color: "#e3e8ee", roughness: 0.9, bumpMap: bump, bumpScale: 2 });
  }, []);
  const glow = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false, transparent: true, opacity: 0.9 }),
    []
  );
  const groove = useMemo(() => new THREE.MeshBasicMaterial({ color: "#8f99a8", transparent: true, opacity: 0.6 }), []);
  const rings = [1.7, 2.5, 3.4, 4.5, 5.9, 7.6];

  useFrame(() => {
    if (group.current) group.current.visible = camera.position.z < -92;
  });

  return (
    <group ref={group} position={[0, 0, FINALE_Z]}>
      <mesh rotation-x={-Math.PI / 2} material={floorMat}>
        <circleGeometry args={[18, 96]} />
      </mesh>
      {rings.map((r, i) => (
        <mesh key={r} rotation-x={-Math.PI / 2} position={[0, 0.02, 0]} material={i % 2 ? groove : glow}>
          <torusGeometry args={[r, i % 2 ? 0.012 : 0.02, 8, 160]} />
        </mesh>
      ))}
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.2, 1.3, 0.28, 72]} />
        <meshPhysicalMaterial color="#f2f5f8" roughness={0.35} clearcoat={1} clearcoatRoughness={0.25} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.29, 0]} material={glow}>
        <torusGeometry args={[1.18, 0.018, 8, 120]} />
      </mesh>
      <PointMonogram />
    </group>
  );
}
