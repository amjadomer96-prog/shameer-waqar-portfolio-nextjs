"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { EMAIL } from "@/lib/site";
import { scrollToId } from "@/components/motion/SmoothScroll";
import { openPalette } from "./CommandPalette";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "path", label: "Path" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 16;
    if (next !== scrolled) setScrolled(next);
  });

  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-nav border-b transition-[background-color,border-color] duration-200 ease-snap ${
        scrolled ? "border-ink/10 bg-bg/95" : "border-transparent"
      }`}
    >
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <a href="#top" onClick={go("top")} className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em]">
          <span className="font-mono text-accent" aria-hidden="true">
            +
          </span>
          Shameer Waqar
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={go(l.id)}
              className="text-sm text-muted transition-colors duration-150 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-9 items-center gap-2.5 rounded-[10px] border border-ink/10 pl-3 pr-2 text-sm text-muted transition-colors duration-150 hover:border-ink/25 hover:text-ink md:inline-flex"
          >
            <MagnifyingGlass size={15} aria-hidden="true" />
            Search
            <span className="flex gap-1" aria-hidden="true">
              <kbd className="kbd">Ctrl</kbd>
              <kbd className="kbd">K</kbd>
            </span>
          </button>
          <a href={`mailto:${EMAIL}`} className="btn btn-primary btn-sm">
            Say hello
          </a>
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-[10px] border border-ink/10 text-ink md:hidden"
          >
            <List size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
