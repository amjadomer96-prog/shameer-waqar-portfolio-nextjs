"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import { useReduced } from "@/components/motion/useReduced";

function useWide() {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return wide;
}

// 3D coverflow of the app's store screens. Drag, arrow keys, buttons, or let it play.
export default function Coverflow({ shots }) {
  const n = shots.length;
  const [index, setIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduce = useReduced();
  const wide = useWide();
  const box = useRef(null);
  const inView = useInView(box, { amount: 0.4 });

  const go = (d) => setIndex((i) => (i + d + n) % n);

  useEffect(() => {
    if (reduce || paused || hovering || !inView) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 3400);
    return () => clearInterval(t);
  }, [reduce, paused, hovering, inView, n]);

  const H = wide ? 460 : 340;
  const STEP = wide ? 210 : 128;
  const spring = reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 22, mass: 0.9 };

  return (
    <div
      ref={box}
      role="region"
      aria-roledescription="carousel"
      aria-label="SafaLife app screens"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      className="relative rounded-[20px] outline-offset-8"
    >
      <motion.div
        className="relative cursor-grab touch-pan-y active:cursor-grabbing"
        style={{ height: H + 70 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50) go(1);
          else if (info.offset.x > 50) go(-1);
        }}
      >
        {/* each card gets its own perspective so z-index decides overlap, no 3D intersections */}
        <div className="absolute inset-0">
          {shots.map((s, i) => {
            let off = i - index;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const abs = Math.abs(off);
            const w = Math.round(H * (s.w / s.h));
            return (
              <motion.button
                key={s.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show the ${s.label} screen`}
                aria-current={off === 0 ? "true" : undefined}
                tabIndex={off === 0 ? -1 : 0}
                className="absolute left-1/2 top-2 overflow-visible rounded-[18px] focus-visible:outline-offset-4"
                style={{ width: w, height: H, marginLeft: -w / 2, zIndex: 10 - abs, transformPerspective: 1400 }}
                initial={false}
                animate={{
                  x: off * STEP,
                  z: -abs * 170,
                  rotateY: Math.max(-50, Math.min(50, off * -36)),
                  scale: abs === 0 ? 1 : 0.88,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.18,
                }}
                transition={spring}
              >
                <Image
                  src={s.src}
                  alt={`SafaLife ${s.label} screen`}
                  width={s.w}
                  height={s.h}
                  sizes="(min-width: 640px) 330px, 240px"
                  draggable={false}
                  className="pointer-events-none h-full w-full select-none rounded-[18px] object-cover shadow-[0_40px_70px_-30px_rgb(var(--shadow)/calc(var(--shadow-alpha)+0.15))] ring-1 ring-ink/10 [-webkit-box-reflect:below_10px_linear-gradient(transparent_70%,rgb(0_0_0/0.16))]"
                />
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-2 flex items-center justify-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous screen" className="btn btn-ghost h-10 w-10 px-0">
          <CaretLeft size={16} weight="bold" />
        </button>
        <p className="min-w-[7rem] text-center text-sm font-medium" aria-live="polite">
          {shots[index].label}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next screen" className="btn btn-ghost h-10 w-10 px-0">
          <CaretRight size={16} weight="bold" />
        </button>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
            className="btn btn-ghost ml-2 h-10 w-10 px-0"
          >
            {paused ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
          </button>
        )}
      </div>
    </div>
  );
}
