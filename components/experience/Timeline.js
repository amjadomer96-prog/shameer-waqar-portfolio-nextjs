"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

const EASE = [0.16, 1, 0.3, 1];

// Vertical line that draws itself with scroll; each entry's dot lights up as the line reaches it.
export default function Timeline({ groups }) {
  const ref = useRef(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const total = groups.reduce((n, g) => n + g.items.length + 1, 0);
  let row = 0;

  return (
    <div ref={ref} className="relative pl-9">
      <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-ink/10" />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent"
        style={{ scaleY: reduce ? 1 : draw }}
      />

      {groups.map((g) => {
        const headRow = row++;
        return (
          <div key={g.title} className="mb-12 last:mb-0">
            <Row index={headRow} total={total} progress={draw} reduce={reduce} head>
              <h4 className="text-xl font-semibold leading-tight tracking-[-0.025em]">{g.title}</h4>
              {g.meta && (
                <p className="tabular mt-1 font-mono text-[12.5px] text-muted">{g.meta}</p>
              )}
            </Row>
            <ul className="mt-5 space-y-6">
              {g.items.map((item) => {
                const r = row++;
                return (
                  <Row key={item} as="li" index={r} total={total} progress={draw} reduce={reduce}>
                    <p className="max-w-[54ch] text-[17px] leading-relaxed text-ink/90">{item}</p>
                  </Row>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function Row({ as = "div", index, total, progress, reduce, head, children }) {
  const at = index / total;
  const lit = useTransform(progress, [at - 0.02, at + 0.04], [0, 1]);
  const dotScale = useTransform(lit, [0, 1], [0.6, 1]);
  const Tag = motion[as];

  return (
    <Tag
      className="relative"
      initial={reduce ? false : { opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <span
        aria-hidden="true"
        className={`absolute -left-9 grid place-items-center rounded-full bg-bg ${
          head ? "top-[5px] h-[15px] w-[15px]" : "top-[7px] h-[15px] w-[15px]"
        }`}
      >
        <span className="absolute h-[9px] w-[9px] rounded-full ring-1 ring-ink/25" />
        <motion.span
          className="absolute h-[9px] w-[9px] rounded-full bg-accent"
          style={reduce ? undefined : { opacity: lit, scale: dotScale }}
        />
      </span>
      {children}
    </Tag>
  );
}
