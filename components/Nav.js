"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { CONTACT_LABEL, EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { useReduced } from "@/components/motion/useReduced";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const reduce = useReduced();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState(null);

  // state only flips when a threshold is crossed, not on every frame
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nextScrolled = y > 24;
    if (nextScrolled !== scrolled) setScrolled(nextScrolled);
    const nextHidden = !reduce && y > 640 && y > prev + 4;
    const show = y < prev - 4 || y <= 640;
    if (nextHidden && !hidden) setHidden(true);
    else if (show && hidden) setHidden(false);
  });

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      initial={reduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: hidden ? -88 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-nav"
    >
      <div className="wrap pt-3">
        <div
          className={`flex h-14 items-center justify-between gap-4 rounded-full pl-2 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 sm:pl-3 ${
            scrolled
              ? "bg-surface/70 shadow-[0_12px_40px_-20px_rgb(var(--shadow)/var(--shadow-alpha))] ring-1 ring-inset ring-ink/10 backdrop-blur-xl backdrop-saturate-150"
              : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-3 rounded-full pr-2" aria-label="Shameer Waqar, back to top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-mono text-[13px] font-semibold tracking-tight text-bg">
              SW
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight sm:block">
              Shameer Waqar
            </span>
          </a>

          <nav aria-label="Sections" className="hidden items-center md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative isolate rounded-full px-4 py-2 text-sm transition-colors ${
                  active === l.id ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full text-ink/75 transition-colors hover:bg-ink/[0.06] hover:text-ink"
            >
              <GithubLogo size={20} />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full text-ink/75 transition-colors hover:bg-ink/[0.06] hover:text-ink"
            >
              <LinkedinLogo size={20} />
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-primary btn-sm ml-1">
              {CONTACT_LABEL}
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
