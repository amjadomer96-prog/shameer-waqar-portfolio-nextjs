"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS } from "@/lib/projects";
import {
  coverTexture,
  iceBlockGeometry,
  iceMaterial,
  phoneBodyGeometry,
  screenGeometry,
} from "../assets";
import { BLOCK_Z, openProject } from "../state";

const damp = THREE.MathUtils.damp;
const SCREEN_W = 0.67;
const SCREEN_H = 1.46;

const phoneMat = new THREE.MeshStandardMaterial({ color: "#0d1016", roughness: 0.4, metalness: 0.6 });

function Shard({ seed, radius, speed, phase, y }) {
  const ref = useRef(null);
  const geo = useMemo(
    () =>
      iceBlockGeometry(0.22 + (seed % 3) * 0.08, 0.32 + (seed % 2) * 0.22, 0.2, {
        seed,
        chunk: 0.05,
        chip: 0.02,
        seg: 6,
      }),
    [seed]
  );
  const mat = useMemo(() => iceMaterial({ thickness: 0.4 }), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, y + Math.sin(t * 1.3) * 0.15, Math.sin(t) * radius * 0.6);
    ref.current.rotation.set(t * 0.7, t, t * 0.4);
  });
  return <mesh ref={ref} geometry={geo} material={mat} />;
}

function ProjectBlock({ project, index, texture }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const screenMat = useRef(null);
  const camera = useThree((s) => s.camera);
  const [hover, setHover] = useState(false);
  const z = BLOCK_Z(index);

  const ice = useMemo(
    () => iceBlockGeometry(1.5, 2.25, 1.05, { seed: index * 7.3 + 1, chunk: 0.14, chip: 0.04, seg: 16 }),
    [index]
  );
  const mat = useMemo(() => iceMaterial(), []);
  const body = useMemo(() => phoneBodyGeometry(0.73, 1.53, 0.1, 0.06), []);
  const screen = useMemo(() => screenGeometry(SCREEN_W, SCREEN_H, 0.08), []);
  useMemo(() => coverTexture(texture, SCREEN_W / SCREEN_H), [texture]);
  const shards = useMemo(
    () => [0, 1, 2].map((k) => ({ seed: index * 3 + k + 1, radius: 1.45 + k * 0.28, speed: 0.16 + k * 0.06, phase: k * 2.1, y: (k - 1) * 0.75 })),
    [index]
  );

  useFrame(({ clock }, dt) => {
    const g = outer.current;
    if (!g) return;
    g.visible = Math.abs(camera.position.z - z) < 24;
    if (!g.visible) return;
    const t = clock.elapsedTime;
    // face the camera when it arrives, turn away as it approaches and leaves
    const rel = camera.position.z - (z + 5.1);
    inner.current.rotation.y = Math.sin(t * 0.25 + index) * 0.16 + THREE.MathUtils.clamp(rel * 0.12, -0.9, 0.9);
    inner.current.rotation.x = Math.sin(t * 0.3 + index * 2) * 0.08;
    g.position.y = 2 + Math.sin(t * 0.7 + index) * 0.05;
    const s = damp(inner.current.scale.x, hover ? 1.05 : 1, 6, dt);
    inner.current.scale.setScalar(s);
    if (screenMat.current) {
      const c = damp(screenMat.current.color.r, hover ? 1 : 0.86, 6, dt);
      screenMat.current.color.setRGB(c, c, c);
    }
  });

  return (
    <group ref={outer} position={[0, 2, z]}>
      <group ref={inner}>
        <group rotation={[0.04, -0.22, 0.05]}>
          <mesh geometry={body} material={phoneMat} />
          <mesh geometry={screen} position={[0, 0, 0.043]}>
            <meshBasicMaterial ref={screenMat} map={texture} toneMapped={false} color="#dbdbdb" />
          </mesh>
        </group>
        <mesh
          geometry={ice}
          material={mat}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = "";
          }}
          onClick={(e) => {
            e.stopPropagation();
            openProject(project.slug);
          }}
        />
      </group>
      {shards.map((s) => (
        <Shard key={s.seed} {...s} />
      ))}
    </group>
  );
}

export default function ProjectBlocks() {
  const textures = useLoader(
    THREE.TextureLoader,
    PROJECTS.map((p) => p.frozen)
  );
  return PROJECTS.map((p, i) => (
    <ProjectBlock key={p.slug} project={p} index={i} texture={textures[i]} />
  ));
}
