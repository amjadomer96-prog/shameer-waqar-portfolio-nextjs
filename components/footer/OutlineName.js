"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

// Oversized name: drawn as an outline, filled left to right as the footer scrolls in.
export default function OutlineName() {
  const ref = useRef(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const clip = useTransform(scrollYProgress, [0.1, 0.95], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

  const type =
    "block whitespace-nowrap text-[clamp(2.6rem,11vw,10.4rem)] font-semibold leading-[0.9] tracking-[-0.06em]";

  return (
    <div ref={ref} aria-hidden="true" className="relative select-none overflow-hidden pb-[0.06em]">
      <span className={`${type} text-transparent [-webkit-text-stroke:1px_rgb(var(--ink)/0.22)]`}>
        Shameer Waqar
      </span>
      <motion.span
        className={`${type} absolute inset-0 text-ink`}
        style={{ clipPath: reduce ? "none" : clip }}
      >
        Shameer Waqar
      </motion.span>
    </div>
  );
}
