"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

const SPRING = { stiffness: 180, damping: 20, mass: 0.6 };

/*
  A frame for a screen or recording. It swings up into place in 3D as it
  scrolls into view, then leans toward a mouse pointer. It always comes to rest
  flat, so the work inside is sharp whenever you stop to look at it.
*/
export default function TiltFrame({ children, index = 0, tilt = true, max = 7, className = "" }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const rx = useSpring(0, SPRING);
  const ry = useSpring(0, SPRING);

  const onPointerMove = (e) => {
    if (!tilt || reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * max);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 2 * max);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={`[perspective:1200px] ${className}`}
      initial={reduce ? false : { opacity: 0, y: 70, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        className="will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
