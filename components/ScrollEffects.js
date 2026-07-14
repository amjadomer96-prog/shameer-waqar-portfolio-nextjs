"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Typewriter for hero eyebrow
    const el = document.getElementById("typewriter");
    if (el) {
      const text = "$ whoami";
      if (reduce) {
        el.textContent = text;
      } else {
        el.textContent = "";
        let i = 0;
        const type = () => {
          el.textContent = text.slice(0, i) + (i < text.length ? "▌" : "");
          if (i <= text.length) {
            i++;
            setTimeout(type, 55);
          }
        };
        type();
      }
    }

    // Reveal on scroll
    const items = document.querySelectorAll(".reveal");
    if (reduce) {
      items.forEach((node) => node.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((node) => io.observe(node));

    return () => io.disconnect();
  }, []);

  return null;
}
