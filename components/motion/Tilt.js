"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

/*
  3D tilt that follows the pointer, with a soft light sheen.
  Also writes --mx / --my so a .spotlight border can follow the same pointer.
*/
export default function Tilt({ children, className, max = 8, sheen = true, style, ...rest }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 20, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const sheenBg = useMotionTemplate`radial-gradient(600px circle at ${gx} ${gy}, rgb(255 255 255 / 0.10), transparent 45%)`;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    if (reduce || e.pointerType !== "mouse") return;
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`group/tilt ${className ?? ""}`}
      style={{
        ...style,
        rotateX: reduce ? 0 : rx,
        rotateY: reduce ? 0 : ry,
        transformPerspective: 1200,
      }}
      {...rest}
    >
      {children}
      {sheen && !reduce && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{ background: sheenBg }}
        />
      )}
    </motion.div>
  );
}
