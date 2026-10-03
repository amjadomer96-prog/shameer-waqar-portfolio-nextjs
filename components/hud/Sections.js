"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { ALSO_SHIPPED } from "@/lib/projects";
import { EDUCATION, ROLES, STACK } from "@/lib/profile";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE, PHONE_HREF } from "@/lib/site";
import { openProject } from "@/components/world/state";
import CopyEmail from "@/components/contact/CopyEmail";
import Section, { useSection } from "./Section";
import Scramble from "./Scramble";
import { useWorldMode } from "./Experience";

const EASE = [0.16, 1, 0.3, 1];

// Leader line that draws itself when its section is in view.
function Lead({ x1, y1, x2, y2, delay = 0 }) {
  const { active } = useSection();
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
      initial={false}
      animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.55 : 0 }}
      transition={{ duration: 0.9, delay: active ? delay : 0, ease: EASE }}
    />
  );
}

function Leads({ children, className = "" }) {
  return (
    <svg aria-hidden="true" className={`absolute inset-0 h-full w-full text-ink ${className}`}>
      {children}
    </svg>
  );
}

/* ---------- hero ---------- */

export function HeroSection() {
  const mode = useWorldMode();
  return (
    <Section id="top" label="Introduction" heightClass="h-[170vh]" fadeIn={false}>
      <h1 className={mode === "static" ? "absolute inset-x-0 top-[38%] text-center text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.06em]" : "sr-only"}>
        Shameer Waqar
        <span className="sr-only">, full-stack and mobile developer</span>
      </h1>

      <div className="hud gx-l absolute top-[104px] max-w-[22rem]">
        <Scramble as="p" text="// Full-stack and mobile developer" />
        <p className="hud-muted mt-3">
          Legit Design Studio
          <br />
          Karachi, PK
        </p>
      </div>

      <div className="hud gx-r absolute top-[104px] hidden max-w-[19rem] text-right sm:block">
        <p>////// About</p>
        <p className="hud-copy mt-3">
          I build web and mobile products end to end, from the interface to the
          API. Right now: the iFund app in React Native.
        </p>
      </div>

      <p className="hud gx-l absolute bottom-[76px]">Scroll down to discover.</p>
    </Section>
  );
}

/* ---------- status readout next to the monolith ---------- */

const STATUS = [
  ["Open to", "Freelance projects"],
  ["Role", "Full Stack Developer"],
  ["Studio", "Legit Design Studio"],
  ["Base", "Karachi, PK"],
  ["Focus", "React Native, MERN, Three.js"],
];

export function AboutSection() {
  return (
    <Section id="about" label="Status" heightClass="h-[160vh]">
      <Leads className="hidden lg:block">
        <Lead x1="34%" y1="41%" x2="44%" y2="41%" delay={0.2} />
        <Lead x1="44%" y1="41%" x2="49%" y2="47%" delay={0.5} />
      </Leads>
      <div className="hud gx-l absolute top-1/2 w-[min(23rem,calc(100%-2*var(--gx)))] -translate-y-1/2 lg:w-[calc(34%-var(--gx))]">
        <p>////// Status</p>
        <dl className="mt-4 divide-y divide-ink/15 border-y border-ink/15">
          {STATUS.map(([k, v], i) => (
            <div key={k} className="flex justify-between gap-6 py-2.5">
              <dt className="hud-muted">{k}</dt>
              <dd className="text-right">
                <Scramble text={v} delay={i * 80} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* ---------- one project, frozen ---------- */

export function ProjectSection({ project, index }) {
  const mode = useWorldMode();
  return (
    <Section id={project.slug} label={project.name} heightClass="h-[150vh]">
      {/* faint, blurred readout drifting behind the block */}
      <p
        aria-hidden="true"
        className="absolute -left-[2%] top-[30%] select-none whitespace-nowrap font-mono text-[9vw] uppercase leading-none text-ink/[0.14] blur-[5px]"
      >
        {project.domain}
      </p>

      {mode === "static" && (
        <div className="absolute left-1/2 top-1/2 w-[min(210px,42vw)] -translate-x-1/2 -translate-y-1/2 rotate-[-4deg] overflow-hidden rounded-[22px] bg-[#0d1016] p-[6px] shadow-[0_40px_80px_-30px_rgb(var(--shadow)/0.5)] ring-1 ring-white/40">
          <Image src={project.frozen} alt={`${project.name} screen`} width={600} height={1300} loading="eager" className="block h-auto w-full rounded-[17px]" />
        </div>
      )}

      {index === 0 && <p className="hud gx-l absolute top-[104px]">////// Selected work</p>}

      <Leads className="hidden md:block">
        <Lead x1="24%" y1="27%" x2="36%" y2="27%" delay={0.1} />
        <Lead x1="36%" y1="27%" x2="44%" y2="36%" delay={0.4} />
        <Lead x1="58%" y1="46.5%" x2="55%" y2="46.5%" delay={0.5} />
        <Lead x1="59%" y1="71%" x2="74%" y2="71%" delay={0.6} />
        <Lead x1="59%" y1="71%" x2="55%" y2="64%" delay={0.8} />
      </Leads>

      <div className="hud absolute left-[var(--gx)] top-[19%] md:left-[24%]">
        <Scramble as="p" text={project.code} className="hud-muted" />
        <h2 className="mt-1 text-[15px] font-medium tracking-[0.1em]">
          <Scramble text={project.name.toUpperCase()} delay={120} />
        </h2>
      </div>

      <div className="hud absolute left-[59%] top-[43%] hidden md:block">
        <p className="hud-muted">Stack</p>
        {project.stack.slice(0, 3).map((s, i) => (
          <Scramble as="p" key={s} text={s} delay={200 + i * 90} />
        ))}
      </div>

      <div className="absolute bottom-[19%] left-1/2 -translate-x-1/2 text-center md:bottom-auto md:left-[59%] md:top-[64%] md:translate-x-0 md:text-left">
        <p className="hud hud-muted">
          <Scramble text={`D ${project.date}`} delay={300} />
        </p>
        <button
          type="button"
          onClick={() => openProject(project.slug)}
          className="hud pointer-events-auto mt-1 inline-flex items-center gap-2 py-1 transition-opacity hover:opacity-60"
        >
          Click to explore
          <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          <span className="sr-only">{project.name}</span>
        </button>
      </div>

      <p className="hud-copy gx-l absolute bottom-[76px] hidden max-w-[34ch] text-ink/75 lg:block">
        {project.summary}
      </p>
    </Section>
  );
}

/* ---------- log: experience, education, stack ---------- */

export function LogSection() {
  return (
    <Section id="log" label="Experience and education" heightClass="lg:h-[240vh]" flowOnMobile>
      <div className="grid gap-14 px-[var(--gx)] lg:absolute lg:inset-x-0 lg:top-[104px] lg:grid-cols-[1.1fr_1fr] lg:gap-[6vw]">
        <div>
          <p className="hud">////// Experience</p>
          <ol className="mt-5 space-y-7">
            {ROLES.map((r) => (
              <li key={r.title} className="border-t border-ink/15 pt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[clamp(1.25rem,2vw,1.6rem)] font-semibold leading-tight tracking-[-0.03em]">
                    {r.title}
                  </h3>
                  <p className="hud hud-muted">{r.period}</p>
                </div>
                <p className="hud mt-1">{r.org}</p>
                <ul className="hud-copy mt-3 space-y-1.5 text-ink/75">
                  {r.lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="hud">////// Education</p>
          <ol className="mt-5 border-t border-ink/15">
            {EDUCATION.map((e) => (
              <li key={e.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 border-b border-ink/15 py-3">
                <div>
                  <p className="text-[15px] font-medium tracking-[-0.01em]">{e.title}</p>
                  <p className="hud hud-muted mt-0.5">{e.org}</p>
                </div>
                <p className="hud">{e.period}</p>
              </li>
            ))}
          </ol>

          <p className="hud mt-10">////// Stack</p>
          <p className="hud-copy mt-3 text-ink/80">{STACK.join("  /  ")}</p>

          <p className="hud mt-10">////// Also shipped</p>
          <ul className="mt-3 space-y-2">
            {ALSO_SHIPPED.map((a) => (
              <li key={a.name}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hud-copy pointer-events-auto inline-flex items-start gap-1.5 text-ink/80 underline decoration-ink/25 underline-offset-4 hover:text-accent"
                >
                  <span>
                    <span className="font-medium text-ink">{a.name}</span>: {a.line}
                  </span>
                  <ArrowUpRight size={12} weight="bold" className="mt-1 shrink-0" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/* ---------- contact ---------- */

const CHANNELS = [
  { label: "Email", href: `mailto:${EMAIL}`, external: false },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Phone", href: PHONE_HREF, external: false },
];

function ChannelCarousel() {
  const [i, setI] = useState(0);
  const n = CHANNELS.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  const at = (d) => CHANNELS[(i + d + n) % n];

  return (
    <div className="pointer-events-auto flex items-center justify-center gap-4 sm:gap-8">
      <button type="button" onClick={() => go(-1)} aria-label="Previous channel" className="hud p-2 hover:opacity-60">
        <ArrowLeft size={18} aria-hidden="true" />
      </button>
      <span className="hud hud-muted hidden w-24 text-right sm:block" aria-hidden="true">
        {at(-1).label}
      </span>
      <a
        href={at(0).href}
        target={at(0).external ? "_blank" : undefined}
        rel={at(0).external ? "noopener noreferrer" : undefined}
        className="hud bracket min-w-[9.5rem] text-center transition-opacity hover:opacity-70"
        aria-live="polite"
      >
        {at(0).label}
      </a>
      <span className="hud hud-muted hidden w-24 sm:block" aria-hidden="true">
        {at(1).label}
      </span>
      <button type="button" onClick={() => go(1)} aria-label="Next channel" className="hud p-2 hover:opacity-60">
        <ArrowRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

export function ContactSection() {
  return (
    <Section id="contact" label="Contact" heightClass="h-[170vh]" fadeOut={false}>
      <p className="hud gx-l absolute top-[104px]">////// Contact</p>

      <div className="gx-r absolute top-[104px] max-w-[min(26rem,calc(100%-2*var(--gx)))] text-right max-sm:left-[var(--gx)] max-sm:top-[136px] max-sm:text-left">
        <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
          Let&apos;s build something.
        </h2>
        <p className="hud-copy mt-4 text-ink/75">
          Open to freelance MERN and mobile builds, and early AI product work.
          Based in Karachi, happy to work remote.
        </p>
        <p className="hud mt-4 break-all">{EMAIL}</p>
        <p className="hud hud-muted mt-1">{PHONE}</p>
        <div className="pointer-events-auto mt-5 flex flex-wrap justify-end gap-2 max-sm:justify-start">
          <a href={`mailto:${EMAIL}`} className="btn btn-primary btn-sm">
            Say hello
          </a>
          <CopyEmail email={EMAIL} className="btn btn-ghost btn-sm" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[76px] px-[var(--gx)]">
        <ChannelCarousel />
      </div>
      <p className="hud hud-muted gx-r absolute bottom-6">&copy; 2026 Shameer Waqar</p>
    </Section>
  );
}
