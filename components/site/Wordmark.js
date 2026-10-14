"use client";

import { useEffect, useRef } from "react";

const NAME = "Shameer Waqar";

/*
  The name, set as large as the page is wide, closing every page. Letters turn
  up out of the baseline one after another when the footer scrolls into view.
  The resting state is in CSS (.wordmark in globals.css): without JavaScript,
  or with reduced motion, the name simply sits there.
*/
export default function Wordmark() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // armed only now, so the letters are never hidden without a way to show them
    el.dataset.armed = "";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = "";
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <p ref={ref} aria-hidden="true" className="wordmark wrap mt-14 select-none sm:mt-20">
      {[...NAME].map((ch, i) => (
        <span key={i} style={{ "--i": i }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </p>
  );
}
