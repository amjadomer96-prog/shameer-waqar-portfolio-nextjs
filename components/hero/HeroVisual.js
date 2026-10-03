"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { HERO_PANELS } from "@/lib/projects";

const WorkScene = dynamic(() => import("./WorkScene"), { ssr: false });

function supportsWebGL2() {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

// CSS 3D version of the same stack: first paint, reduced motion, and no-WebGL fallback.
const STATIC_LAYOUT = [
  { x: "-14%", y: "16%", z: 60, s: 0.62 },
  { x: "-2%", y: "3%", z: -40, s: 0.62 },
  { x: "10%", y: "-10%", z: -140, s: 0.62 },
  { x: "22%", y: "-22%", z: -240, s: 0.62 },
];

function StaticStack({ hidden }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 transition-opacity duration-700 [perspective:1400px] ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="preserve-3d absolute inset-0 [transform:rotateY(-22deg)_rotateX(3deg)]">
        {HERO_PANELS.map((p, i) => {
          const l = STATIC_LAYOUT[i];
          return (
            <div
              key={p.src}
              className="absolute left-[19%] top-[30%] w-[62%] overflow-hidden rounded-[12px] ring-1 ring-white/10"
              style={{
                transform: `translate3d(${l.x}, ${l.y}, ${l.z}px)`,
                zIndex: HERO_PANELS.length - i,
                boxShadow: "0 40px 80px -30px rgb(var(--shadow) / var(--shadow-alpha))",
              }}
            >
              <Image
                src={p.src}
                alt=""
                width={p.w}
                height={p.h}
                sizes="(min-width: 1024px) 34vw, 70vw"
                priority={i === 0}
                className="block h-auto w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const box = useRef(null);
  const [mode, setMode] = useState("static"); // "static" | "webgl"
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [source, setSource] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !supportsWebGL2()) return;
    setSource(document.getElementById("hero"));
    // let the page paint first, then bring in three.js
    const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
    const id = idle(() => setMode("webgl"));
    return () => (window.cancelIdleCallback ?? clearTimeout)(id);
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <div
      ref={box}
      className="relative h-full w-full [mask-image:linear-gradient(to_bottom,#000_86%,transparent)]"
    >
      <StaticStack hidden={ready} />
      {mode === "webgl" && source && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <WorkScene active={active} onReady={onReady} eventSource={source} />
        </div>
      )}
    </div>
  );
}
