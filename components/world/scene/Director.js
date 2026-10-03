"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS } from "@/lib/projects";
import { BLOCK_Z, FINALE_Z, LOG_Z, world } from "../state";

const damp = THREE.MathUtils.damp;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/*
  Camera keyframes are tied to the real page sections, so the 3D journey
  always lines up with the HUD text no matter the screen size.
*/
function measure() {
  const vh = window.innerHeight;
  const topOf = (el) => el.getBoundingClientRect().top + window.scrollY;
  const mid = (id) => {
    const el = document.getElementById(id);
    return el ? topOf(el) + Math.max(0, el.offsetHeight - vh) * 0.5 : null;
  };
  const start = (id) => {
    const el = document.getElementById(id);
    return el ? topOf(el) : null;
  };
  const max = Math.max(1, document.documentElement.scrollHeight - vh);
  const keys = [];
  const add = (y, pos, look, fog) => {
    if (y == null) return;
    keys.push({ y, pos: new THREE.Vector3(...pos), look: new THREE.Vector3(...look), fog });
  };

  add(0, [0, 1.55, 7.6], [0, 1.4, 0], [7, 46]);
  add(mid("top"), [2.5, 1.9, 5.3], [0, 1.45, 0], [7, 46]);
  add(mid("about"), [-3.3, 3.0, 5.0], [0, 1.6, 0], [6, 40]);
  // rise over the monolith and turn toward the archive
  add(start("work"), [-0.6, 5.2, -5], [0, 2.4, -24], [4, 24]);
  PROJECTS.forEach((p, i) => {
    const z = BLOCK_Z(i);
    add(mid(p.slug), [0, 2.05, z + 5.1], [0, 2, z], [3.5, 19]);
  });
  add(mid("log"), [0, 2.3, LOG_Z + 11], [0, 2.4, LOG_Z], [3, 18]);
  add(max, [0, 3.7, FINALE_Z + 8.4], [0, 1.6, FINALE_Z], [5, 30]);

  keys.sort((a, b) => a.y - b.y);
  world.keys = keys;

  const contact = document.getElementById("contact");
  if (contact) world.finale = [topOf(contact) - vh * 0.8, max - vh * 0.05];
}

export default function Director() {
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);
  const size = useThree((s) => s.size);
  const look = useRef(new THREE.Vector3(0, 1.4, 0));
  const target = useRef({ pos: new THREE.Vector3(), look: new THREE.Vector3() });

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    const late = setTimeout(measure, 1200);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(late);
    };
  }, []);

  // wider lens on portrait screens so the objects still fit
  useEffect(() => {
    const aspect = size.width / size.height;
    camera.fov = aspect < 0.8 ? 56 : aspect < 1.2 ? 46 : 38;
    camera.updateProjectionMatrix();
  }, [camera, size]);

  useFrame((state, dt) => {
    const keys = world.keys;
    if (keys.length < 2) return;
    const y = window.scrollY;
    world.scroll = y;

    let i = 0;
    while (i < keys.length - 2 && y > keys[i + 1].y) i++;
    const a = keys[i];
    const b = keys[i + 1];
    const t = b.y === a.y ? 1 : Math.min(1, Math.max(0, (y - a.y) / (b.y - a.y)));
    const e = ease(t);

    const tp = target.current.pos.lerpVectors(a.pos, b.pos, e);
    const tl = target.current.look.lerpVectors(a.look, b.look, e);
    tp.x += state.pointer.x * 0.35;
    tp.y += state.pointer.y * 0.18;

    const k = 3.5;
    camera.position.set(
      damp(camera.position.x, tp.x, k, dt),
      damp(camera.position.y, tp.y, k, dt),
      damp(camera.position.z, tp.z, k, dt)
    );
    look.current.set(
      damp(look.current.x, tl.x, k, dt),
      damp(look.current.y, tl.y, k, dt),
      damp(look.current.z, tl.z, k, dt)
    );
    camera.lookAt(look.current);

    if (scene.fog) {
      scene.fog.near = damp(scene.fog.near, THREE.MathUtils.lerp(a.fog[0], b.fog[0], e), 3, dt);
      scene.fog.far = damp(scene.fog.far, THREE.MathUtils.lerp(a.fog[1], b.fog[1], e), 3, dt);
    }
  });

  return null;
}
