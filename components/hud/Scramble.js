"use client";

import { useEffect, useRef } from "react";
import { useReduced } from "@/components/motion/useReduced";
import { useSection } from "./Section";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_-.:#*";

// Text that decodes from random glyphs each time its section comes into view.
// The server renders the final text, so it is readable without JavaScript.
export default function Scramble({ text, as: Tag = "span", className, duration = 650, delay = 0 }) {
  const ref = useRef(null);
  const { active } = useSection();
  const reduce = useReduced();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!active || reduce) {
      el.textContent = text;
      return;
    }
    let raf;
    let start;
    const step = (t) => {
      if (start === undefined) start = t + delay;
      const p = Math.min(1, Math.max(0, (t - start) / duration));
      const n = Math.floor(p * text.length);
      let out = text.slice(0, n);
      for (let i = n; i < text.length; i++) {
        out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, active, reduce, duration, delay]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
