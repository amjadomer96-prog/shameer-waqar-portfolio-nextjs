"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useTransform, useVelocity } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROJECTS } from "@/lib/projects";
import { hexToTriplet } from "@/lib/field";
import Reveal from "@/components/motion/Reveal";
import { useReduced } from "@/components/motion/useReduced";

// One picture per project for the hover preview, cropped to the card.
const PREVIEW = {
  ifund: { src: PROJECTS.find((p) => p.slug === "ifund").screens[3].src, shape: "aspect-[4/5]", pos: "object-top" },
  "lds-library": { src: "/work/lds-library/poster.jpg", shape: "aspect-[16/10]", pos: "object-left-top" },
  amariya: { src: "/work/amariya/poster.jpg", shape: "aspect-[16/10]", pos: "object-center" },
  safalife: { src: "/images/shot-salah.jpg", shape: "aspect-[4/5]", pos: "object-top" },
};

const FOLLOW = { stiffness: 220, damping: 26, mass: 0.6 };

/*
  The work as an index: one row per project, each a link to its case study.
  With a mouse, a preview of the hovered project follows the pointer and
  leans in 3D with its speed. On touch it is a plain list.
*/
export default function WorkIndex() {
  const box = useRef(null);
  const reduce = useReduced();
  const [active, setActive] = useState(null);
  const x = useSpring(0, FOLLOW);
  const y = useSpring(0, FOLLOW);
  const rotate = useTransform(useVelocity(x), [-1800, 1800], [-9, 9], { clamp: true });
  const rotateX = useTransform(useVelocity(y), [-1500, 1500], [10, -10], { clamp: true });

  const place = (e, jump) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    if (jump) {
      x.jump(px);
      y.jump(py);
    } else {
      x.set(px);
      y.set(py);
    }
  };

  const preview = !reduce && (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className="pointer-events-none absolute left-0 top-0 z-10 hidden [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      {/* the card floats just above the pointer, clear of the row being read */}
      <div className="-translate-x-1/2 -translate-y-full pb-7">
        <motion.div
          style={{ rotate, rotateX, transformPerspective: 900, transformOrigin: "50% 100%" }}
          initial={false}
          animate={{ opacity: active === null ? 0 : 1, scale: active === null ? 0.86 : 1 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-[300px] overflow-hidden rounded-[14px] bg-surface shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-ink/10">
            {PROJECTS.map((p, i) => {
              const v = PREVIEW[p.slug];
              return (
                <div
                  key={p.slug}
                  className={`${v.shape} ${i === active ? "relative opacity-100" : "absolute inset-0 opacity-0"} transition-opacity duration-200`}
                >
                  <Image src={v.src} alt="" fill sizes="300px" quality={90} className={`object-cover ${v.pos}`} />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={box}
      className="relative mt-14"
      onPointerEnter={(e) => e.pointerType === "mouse" && place(e, true)}
      onPointerMove={(e) => e.pointerType === "mouse" && place(e, false)}
      onPointerLeave={() => setActive(null)}
    >
      {preview}
      <ol className="group/list border-t border-ink/10">
        {PROJECTS.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={0.06 * i} className="border-b border-ink/10">
            <a
              href={`/work/${p.slug}`}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(null)}
              style={{ "--accent": hexToTriplet(p.accent) }}
              className="group grid grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-4 py-6 transition-opacity duration-300 group-hover/list:opacity-45 hover:!opacity-100 focus-visible:!opacity-100 sm:py-7 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,13rem)_auto] md:gap-x-8"
            >
              <span className="self-start pt-[0.9em] font-mono text-[12px] text-muted md:pt-[1.4em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <span className="block text-[clamp(2.1rem,6.2vw,5.2rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-[color,transform] duration-300 ease-land group-hover:translate-x-2 group-hover:text-accent">
                  {p.name}
                  <sup className="ml-2 align-super font-mono text-[11px] font-normal tracking-normal text-muted">{p.year}</sup>
                </span>
                <span className="mt-2 block text-[14px] text-muted md:hidden">{p.kind}</span>
              </span>
              <span className="hidden text-[15px] leading-snug text-muted md:block">
                {p.kind}
                <span className="mt-1 block font-mono text-[12px] text-ink/50">{p.stack.slice(0, 3).join(" / ")}</span>
              </span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-muted transition-[transform,color,border-color,background-color] duration-300 ease-land group-hover:rotate-45 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-accent">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
              <span className="sr-only">Read the case study</span>
            </a>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
