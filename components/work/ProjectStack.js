"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, LockSimple } from "@phosphor-icons/react";
import Tilt from "@/components/motion/Tilt";
import AutoVideo from "./AutoVideo";
import { useReduced } from "@/components/motion/useReduced";

const EASE = [0.16, 1, 0.3, 1];

// Sticky card stack: each card pins, and the ones underneath shrink and dim as the next arrives.
export default function ProjectStack({ projects }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {projects.map((p, i) => (
        <StackCard key={p.slug} p={p} i={i} n={projects.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function StackCard({ p, i, n, progress }) {
  const reduce = useReduced();
  const last = i === n - 1;
  const start = i / n;
  const targetScale = 1 - (n - 1 - i) * 0.045;
  const scale = useTransform(progress, [start, 1], [1, targetScale]);
  const shade = useTransform(
    progress,
    [(i + 0.55) / n, Math.min(1, (i + 1.1) / n)],
    [0, last ? 0 : 0.5]
  );

  return (
    <>
      {/* plain anchor so links land on the card's resting position, not its stuck one */}
      <span id={p.slug} className="block scroll-mt-28" aria-hidden="true" />
      <div
        className={`lg:sticky ${last ? "" : "mb-8 lg:mb-[22vh]"}`}
        style={{ top: `calc(6rem + ${i * 22}px)` }}
      >
        <motion.article
          aria-labelledby={`${p.slug}-title`}
          style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: EASE }}
          className="card relative overflow-hidden p-3 sm:p-4 lg:p-5"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
            <MediaStage p={p} />
            <CardBody p={p} />
          </div>
          {!reduce && (
            <motion.div
              aria-hidden="true"
              style={{ opacity: shade }}
              className="pointer-events-none absolute inset-0 bg-bg"
            />
          )}
        </motion.article>
      </div>
    </>
  );
}

function MediaStage({ p }) {
  return (
    <Tilt max={5} className="preserve-3d relative rounded-[14px] pb-6 pr-6 sm:pb-8 sm:pr-10">
      <div className="overflow-hidden rounded-[12px] bg-black ring-1 ring-ink/10">
        <div className="flex h-9 items-center justify-between gap-3 bg-surface-2 px-3.5">
          <span className="truncate font-mono text-[11.5px] text-muted">{p.domain}</span>
          <span className="flex shrink-0 items-center gap-1.5 text-[11.5px] font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
            Live
          </span>
        </div>
        <AutoVideo src={p.video} poster={p.poster} label={`${p.name} walkthrough`} />
      </div>

      <div
        className="phone-frame absolute bottom-0 right-0 w-[22%] min-w-[84px]"
        style={{ transform: "translateZ(70px)" }}
      >
        <Image
          src={p.mobile}
          alt={`${p.name} on a phone`}
          width={390}
          height={844}
          sizes="140px"
          className="block h-auto w-full rounded-[17px]"
        />
      </div>
    </Tilt>
  );
}

function CardBody({ p }) {
  return (
    <div className="px-2 pb-3 lg:px-0 lg:pb-0 lg:pr-6">
      <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted">
        <span className="tabular font-mono">{p.year}</span>
        <span className="h-px w-5 bg-ink/20" aria-hidden="true" />
        <span>{p.kind}</span>
      </p>
      <h3
        id={`${p.slug}-title`}
        className="text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold leading-none tracking-[-0.04em]"
      >
        {p.name}
      </h3>
      <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-muted">{p.summary}</p>

      <ul className="plus-list mt-6 space-y-3 text-[14.5px] leading-snug text-ink/85">
        {p.points.map((pt) => (
          <li key={pt}>{pt}</li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm group"
        >
          Visit live site
          <ArrowUpRight
            size={15}
            weight="bold"
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        {p.source ? (
          <a href={p.source} target="_blank" rel="noopener noreferrer" className="link-u text-sm">
            Source
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
            <LockSimple size={14} aria-hidden="true" />
            Private repository
          </span>
        )}
      </div>
    </div>
  );
}
