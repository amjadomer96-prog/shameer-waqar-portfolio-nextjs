"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HERO_PANELS } from "@/lib/projects";
import { scrollToId } from "@/components/motion/SmoothScroll";

/*
  Hero scene: the real project screens as curved, rounded panels in a
  receding stack. They fly in on load, follow the pointer, lift on hover,
  fan apart as the page scrolls, and jump to their case study on click.
*/

const panelVert = /* glsl */ `
  uniform float uBend;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += uBend * p.x * p.x;   // gently curved, like a wide display
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const panelFrag = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec2 uSize;
  uniform float uRadius;
  uniform float uDim;
  uniform float uReveal;
  varying vec2 vUv;

  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = sdRoundRect(p, uSize * 0.5, uRadius);
    float aa = fwidth(d);
    float alpha = 1.0 - smoothstep(-aa, aa, d);

    // top-to-bottom wipe during the intro
    float wipe = smoothstep(uReveal - 0.08, uReveal, 1.0 - vUv.y);
    alpha *= 1.0 - wipe;

    vec3 col = texture2D(uMap, vUv).rgb;
    col *= mix(1.0, 0.42, uDim);

    // hairline rim so the edge reads as glass
    float rim = 1.0 - smoothstep(0.0, 0.014, abs(d));
    col = mix(col, vec3(1.0), rim * 0.22);

    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

const shadowFrag = /* glsl */ `
  uniform vec2 uSize;
  uniform vec3 uColor;
  uniform float uAlpha;
  varying vec2 vUv;
  float sdRoundRect(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = sdRoundRect(p, uSize * 0.5 - 0.35, 0.2);
    float a = (1.0 - smoothstep(-0.05, 0.35, d)) * uAlpha;
    gl_FragColor = vec4(uColor, a);
  }
`;

// Stack layout, front to back.
const LAYOUT = [
  { x: -0.42, y: -0.3, z: 0.9 },
  { x: 0.3, y: 0.16, z: -0.25 },
  { x: 1.02, y: 0.62, z: -1.4 },
  { x: 1.74, y: 1.06, z: -2.55 },
];
const BASE_ROT_Y = -0.42;
const PANEL_W = 2.6;

const damp = THREE.MathUtils.damp;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 4);

function readRGB(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const parts = raw.split(/\s+/).map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return fallback;
  return new THREE.Color(parts[0] / 255, parts[1] / 255, parts[2] / 255);
}

function Panel({ texture, index, hovered, setHovered, intro, scrollP }) {
  const gl = useThree((s) => s.gl);
  const mesh = useRef(null);
  const shadow = useRef(null);
  // R3F copies uniform objects onto the material, so animate through these refs
  const mat = useRef(null);
  const shadowMat = useRef(null);
  const slot = LAYOUT[index];
  const panel = HERO_PANELS[index];

  const { geo, shadowGeo, w, h } = useMemo(() => {
    const w = PANEL_W;
    const h = w * (panel.h / panel.w);
    return {
      geo: new THREE.PlaneGeometry(w, h, 32, 1),
      shadowGeo: new THREE.PlaneGeometry(w + 0.9, h + 0.9, 1, 1),
      w,
      h,
    };
  }, [panel]);

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    texture.needsUpdate = true;
  }, [texture, gl]);

  const uniforms = useMemo(
    () => ({
      uMap: { value: texture },
      uSize: { value: new THREE.Vector2(w, h) },
      uRadius: { value: 0.085 },
      uDim: { value: 0 },
      uBend: { value: 0.035 },
      uReveal: { value: 0 },
    }),
    [texture, w, h]
  );

  const shadowUniforms = useMemo(
    () => ({
      uSize: { value: new THREE.Vector2(w + 0.9, h + 0.9) },
      uColor: { value: readRGB("--shadow", new THREE.Color(0, 0, 0)) },
      uAlpha: { value: 0 },
    }),
    [w, h]
  );

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime;

    // intro: each panel flies in from deep space, staggered
    const local = clamp01((t - intro.current - index * 0.14) / 1.5);
    const k = easeOut(local);
    const u = mat.current?.uniforms;
    if (!u) return;
    u.uReveal.value = clamp01(local * 1.25) * 1.1;

    const p = scrollP.current;
    const isHover = hovered === index;
    const dimOthers = hovered !== null && !isHover;

    const fan = 1 + p * 0.9;
    const tx = slot.x * fan + p * index * 0.35;
    const ty = slot.y + Math.sin(t * 0.7 + index * 1.7) * 0.045 + (isHover ? 0.08 : 0);
    const tz = slot.z * fan + (isHover ? 0.55 : 0) - (1 - k) * 9;

    m.position.x = damp(m.position.x, tx, 6, dt);
    m.position.y = damp(m.position.y, ty, 6, dt);
    m.position.z = local < 1 ? tz : damp(m.position.z, tz, 6, dt);
    m.rotation.y = damp(m.rotation.y, isHover ? BASE_ROT_Y * 0.45 : BASE_ROT_Y, 5, dt);
    m.rotation.x = damp(m.rotation.x, isHover ? 0 : 0.05, 5, dt);
    u.uDim.value = damp(u.uDim.value, dimOthers ? 1 : 0, 6, dt);

    if (shadow.current && shadowMat.current) {
      shadow.current.position.set(m.position.x + 0.1, m.position.y - 0.22, m.position.z - 0.12);
      shadow.current.rotation.copy(m.rotation);
      shadowMat.current.uniforms.uAlpha.value = 0.32 * k * (isHover ? 1.2 : 1);
    }
  });

  return (
    <>
      <mesh ref={shadow} geometry={shadowGeo} renderOrder={-1}>
        <shaderMaterial
          ref={shadowMat}
          vertexShader={panelVert}
          fragmentShader={shadowFrag}
          uniforms={shadowUniforms}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh
        ref={mesh}
        geometry={geo}
        position={[slot.x, slot.y, slot.z - 9]}
        rotation={[0.05, BASE_ROT_Y, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered((h) => (h === index ? null : h));
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          scrollToId(panel.target);
        }}
      >
        <shaderMaterial
          ref={mat}
          vertexShader={panelVert}
          fragmentShader={panelFrag}
          uniforms={uniforms}
          transparent
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function Dust({ count = 420 }) {
  const ref = useRef(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = -Math.random() * 9 + 2;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);
  const color = useMemo(() => readRGB("--accent", new THREE.Color("#5684E6")), []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.022}
        color={color}
        transparent
        opacity={0.55}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function Rig({ children, scrollP }) {
  const group = useRef(null);
  const viewport = useThree((s) => s.viewport);
  // keep the whole stack inside narrow canvases
  const fit = Math.min(1, viewport.width / 4.2);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    // sample scroll once per frame instead of listening to scroll events
    const target = clamp01(window.scrollY / (window.innerHeight * 0.9));
    scrollP.current = damp(scrollP.current, target, 5, dt);
    const p = scrollP.current;

    const { x, y } = state.pointer;
    g.rotation.y = damp(g.rotation.y, x * 0.2 - p * 0.35, 3.2, dt);
    g.rotation.x = damp(g.rotation.x, -y * 0.12 + p * 0.18, 3.2, dt);
    g.position.y = damp(g.position.y, p * 1.1, 4, dt);
    g.position.x = damp(g.position.x, x * 0.08, 3, dt);
  });

  return (
    <group ref={group} scale={fit}>
      {children}
    </group>
  );
}

function Panels({ onReady }) {
  const textures = useLoader(
    THREE.TextureLoader,
    HERO_PANELS.map((p) => p.src)
  );
  const [hovered, setHovered] = useState(null);
  const intro = useRef(0);
  const scrollP = useRef(0);
  const clock = useThree((s) => s.clock);

  useEffect(() => {
    intro.current = clock.elapsedTime + 0.15;
    onReady?.();
    return () => {
      document.body.style.cursor = "";
    };
  }, [clock, onReady]);

  return (
    <Rig scrollP={scrollP}>
      {/* back to front so transparency sorts cleanly */}
      {textures
        .map((tex, i) => (
          <Panel
            key={HERO_PANELS[i].src}
            texture={tex}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
            intro={intro}
            scrollP={scrollP}
          />
        ))
        .reverse()}
    </Rig>
  );
}

export default function WorkScene({ active, onReady, eventSource }) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      flat
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      eventSource={eventSource ?? undefined}
      eventPrefix="client"
      aria-hidden="true"
    >
      <Dust />
      <Suspense fallback={null}>
        <Panels onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
