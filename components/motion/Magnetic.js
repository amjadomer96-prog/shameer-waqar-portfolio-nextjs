"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

const SPRING = { stiffness: 260, damping: 18, mass: 0.5 };

// Leans toward a mouse pointer over it and springs back on leave. Kept to the
// one or two main calls to action on a screen; the pull is clamped so the
// control never leaves its own hit area. Touch and reduced motion get none.
export default function Magnetic({ children, strength = 0.28, max = 10, className = "" }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const clamp = (v) => Math.max(-max, Math.min(max, v));
  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(clamp((e.clientX - r.left - r.width / 2) * strength));
    y.set(clamp((e.clientY - r.top - r.height / 2) * strength));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.span>
  );
}
