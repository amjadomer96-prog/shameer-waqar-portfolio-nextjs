"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { FOG_COLOR } from "./assets";
import Director from "./scene/Director";
import { Environment, Lights, Snow } from "./scene/Atmosphere";
import Hero from "./scene/Hero";
import ProjectBlocks from "./scene/ProjectBlocks";
import { Finale, IceRing, LogField } from "./scene/Finale";

function Ready({ onReady }) {
  useEffect(() => {
    // wait one more frame so the first render has happened
    const id = requestAnimationFrame(() => onReady?.());
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

export default function World({ onReady, onProgress, active = true }) {
  useEffect(() => {
    const m = THREE.DefaultLoadingManager;
    m.onProgress = (_, loaded, total) => onProgress?.(total ? loaded / total : 1);
    return () => {
      m.onProgress = undefined;
    };
  }, [onProgress]);

  return (
    <Canvas
      style={{ position: "fixed", inset: 0 }}
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 38, near: 0.1, far: 150, position: [0, 1.55, 7.6] }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.transmissionResolutionScale = 0.75;
        scene.background = new THREE.Color(FOG_COLOR);
        scene.fog = new THREE.Fog(FOG_COLOR, 7, 46);
      }}
      aria-hidden="true"
    >
      <Environment />
      <Lights />
      <Director />
      <Snow />
      <IceRing />
      <LogField />
      <Suspense fallback={null}>
        <Hero />
        <ProjectBlocks />
        <Finale />
        <Ready onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
