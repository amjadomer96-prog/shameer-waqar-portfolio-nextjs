"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  fbm2,
  frostTexture,
  iceBlockGeometry,
  iceMaterial,
  rasterizeText,
  smoothstep,
  softShadowTexture,
} from "../assets";
import { world } from "../state";
import { Plexus } from "./Atmosphere";

const PLEXUS_SIZE = [10, 4.5, 8];

// Snowfield: rolling hills, a flat clearing for the monolith, mountains at the
// edge, and a valley the camera follows into the fog.
function Terrain() {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(84, 84, 200, 200);
    g.rotateX(-Math.PI / 2);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const r = Math.hypot(x, z);
      let h = fbm2(x * 0.07, z * 0.07, 5) * 3 + fbm2(x * 0.4 + 10, z * 0.4, 3) * 0.25;
      const clearing = smoothstep(2.4, 8, r);
      h = h * clearing - 0.05 * (1 - clearing);
      h += smoothstep(12, 36, r) * 5.5 * (0.8 + 0.4 * fbm2(x * 0.05 + 3, z * 0.05, 2));
      const valley = smoothstep(7, 2.5, Math.abs(x)) * smoothstep(-5, -13, z);
      h = h * (1 - valley) - valley * 1.6;
      p.setY(i, h);
    }
    g.computeVertexNormals();
    return g;
  }, []);

  const mat = useMemo(() => {
    const bump = frostTexture().clone();
    bump.repeat.set(18, 18);
    bump.needsUpdate = true;
    return new THREE.MeshStandardMaterial({
      color: "#eef1f5",
      roughness: 0.95,
      bumpMap: bump,
      bumpScale: 2.5,
    });
  }, []);

  return <mesh geometry={geo} material={mat} />;
}

// The hero object: "SW" built from glowing voxels, frozen in a rough ice block.
function Monolith() {
  const body = useRef(null);
  const voxels = useRef(null);
  const ice = useMemo(() => iceBlockGeometry(1.9, 2.7, 1.5, { seed: 3.1, chunk: 0.16, chip: 0.04, seg: 18 }), []);
  const iceMat = useMemo(() => iceMaterial({ thickness: 1.2 }), []);
  const { cells, cellSize } = useMemo(() => rasterizeText("SW", { step: 7, width: 1.45 }), []);
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const voxelMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2b63e6",
        emissive: "#1f4fd6",
        emissiveIntensity: 1.1,
        roughness: 0.35,
        metalness: 0.1,
      }),
    []
  );
  const layers = [-1, 0, 1];

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const size = cellSize * 0.84;
    let k = 0;
    cells.forEach(([x, y]) => {
      layers.forEach((l) => {
        m.makeScale(size, size, size);
        m.setPosition(x, y + 0.05, l * cellSize);
        voxels.current.setMatrixAt(k++, m);
      });
    });
    voxels.current.count = k;
    voxels.current.instanceMatrix.needsUpdate = true;
  }, [cells, cellSize]); // eslint-disable-line react-hooks/exhaustive-deps

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    body.current.rotation.y = Math.sin(t * 0.18) * 0.32 + Math.min(world.scroll * 0.00025, 0.6);
    body.current.rotation.z = Math.sin(t * 0.23) * 0.025;
    body.current.position.y = 1.47 + Math.sin(t * 0.6) * 0.04;
  });

  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position={[0.15, 0.02, 0.15]}>
        <planeGeometry args={[4.4, 4.4]} />
        <meshBasicMaterial
          map={softShadowTexture()}
          transparent
          depthWrite={false}
          color="#55606f"
          opacity={0.55}
        />
      </mesh>
      <group ref={body} position={[0, 1.47, 0]}>
        <instancedMesh ref={voxels} args={[box, voxelMat, cells.length * layers.length]} />
        <mesh geometry={ice} material={iceMat} />
      </group>
    </>
  );
}

export default function Hero() {
  const group = useRef(null);
  const camera = useThree((s) => s.camera);
  useFrame(() => {
    if (group.current) group.current.visible = camera.position.z > -30;
  });
  return (
    <group ref={group}>
      <Terrain />
      <Monolith />
      <Plexus count={34} center={[0, 2.4, 0]} size={PLEXUS_SIZE} maxDist={2.5} opacity={0.42} />
    </group>
  );
}
