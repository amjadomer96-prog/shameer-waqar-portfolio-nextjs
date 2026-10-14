"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowElbowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Copy,
  EnvelopeSimple,
  FolderSimple,
  GithubLogo,
  Globe,
  Hash,
  LinkedinLogo,
  MagnifyingGlass,
  Phone,
  X,
} from "@phosphor-icons/react";
import { PROJECTS } from "@/lib/projects";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE_HREF } from "@/lib/site";
import { scrollToId } from "@/components/motion/SmoothScroll";

const OPEN_EVENT = "palette:open";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

const ITEMS = [
  { group: "Go to", label: "Top", to: "top", icon: Hash },
  { group: "Go to", label: "Selected work", to: "work", icon: Hash },
  ...PROJECTS.map((p) => ({ group: "Projects", label: p.name, hint: p.kind, to: p.slug, icon: FolderSimple })),
  { group: "Go to", label: "About", to: "about", icon: Hash },
  { group: "Go to", label: "Skills", to: "skills", icon: Hash },
  { group: "Go to", label: "Experience and education", to: "path", icon: Hash },
  { group: "Go to", label: "Questions", to: "faq", icon: Hash },
  { group: "Go to", label: "Contact", to: "contact", icon: Hash },
  ...PROJECTS.map((p) => ({
    group: "Case studies",
    label: `${p.name} case study`,
    hint: p.headline,
    href: `/work/${p.slug}`,
    icon: ArrowRight,
  })),
  { group: "Actions", label: "Copy email address", hint: EMAIL, copy: EMAIL, icon: Copy },
  { group: "Actions", label: "Write an email", href: `mailto:${EMAIL}`, icon: EnvelopeSimple },
  { group: "Actions", label: "Call", href: PHONE_HREF, icon: Phone },
  { group: "Links", label: "GitHub", href: GITHUB_URL, external: true, icon: GithubLogo },
  { group: "Links", label: "LinkedIn", href: LINKEDIN_URL, external: true, icon: LinkedinLogo },
  ...PROJECTS.filter((p) => p.live).map((p) => ({
    group: "Links",
    label: `${p.name} live site`,
    hint: p.domain,
    href: p.live,
    external: true,
    icon: Globe,
  })),
];

const GROUPS = ["Go to", "Projects", "Case studies", "Actions", "Links"];

// Ctrl K, Cmd K or "/" from anywhere. Also the menu on small screens.
export default function CommandPalette() {
  const dialog = useRef(null);
  const input = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hits = q
      ? ITEMS.filter((it) => `${it.label} ${it.hint ?? ""} ${it.group}`.toLowerCase().includes(q))
      : ITEMS;
    // keep groups together, in a fixed order
    return GROUPS.flatMap((g) => hits.filter((it) => it.group === g));
  }, [query]);

  useEffect(() => {
    const open = () => {
      const d = dialog.current;
      if (!d || d.open) return;
      setQuery("");
      setActive(0);
      setCopied(false);
      d.showModal();
      window.__lenis?.stop();
      // On touch, focusing the input would raise the keyboard over the menu.
      // Focus the dialog instead; tapping the input still opens the keyboard.
      if (window.matchMedia("(pointer: coarse)").matches) d.focus();
      else input.current?.focus();
    };
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // resume smooth scrolling right away: the dialog close event fires later,
  // after the jump below has already been requested
  const close = () => {
    dialog.current?.close();
    window.__lenis?.start();
  };

  const run = async (item) => {
    if (!item) return;
    if (item.copy) {
      try {
        await navigator.clipboard.writeText(item.copy);
        setCopied(true);
        setTimeout(close, 700);
      } catch {
        close();
      }
      return;
    }
    close();
    // sections live on the home page; from a case study, go there first
    if (item.to && document.getElementById(item.to)) scrollToId(item.to);
    else if (item.to) window.location.href = `/#${item.to}`;
    else if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else if (item.href) window.location.href = item.href;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    }
  };

  // keep the highlighted row in view
  useEffect(() => {
    document.getElementById(`palette-opt-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  let lastGroup = null;
  const count = `${results.length} ${results.length === 1 ? "result" : "results"}`;

  return (
    <dialog
      ref={dialog}
      aria-label="Search and navigate"
      tabIndex={-1}
      onClose={() => window.__lenis?.start()}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
      className="palette mx-auto mb-auto mt-[12vh] w-[min(560px,92vw)] overflow-hidden rounded-[14px] border border-ink/[0.12] bg-surface p-0 text-ink shadow-[0_40px_100px_-30px_rgb(0_0_0/0.9)] outline-none"
    >
      <div className="flex items-center gap-3 border-b border-ink/10 px-4">
        <MagnifyingGlass size={17} className="shrink-0 text-muted" aria-hidden="true" />
        <input
          ref={input}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results.length ? `palette-opt-${active}` : undefined}
          aria-label="Search sections, projects and links"
          placeholder="Search sections, projects and links"
          autoComplete="off"
          spellCheck={false}
          className="h-[52px] w-full bg-transparent text-[15px] outline-none placeholder:text-muted/70"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Esc: close"
          className="-mr-2 grid h-11 min-w-11 shrink-0 place-items-center rounded-[9px] text-muted transition-colors duration-150 hover:text-ink"
        >
          <kbd className="kbd hidden md:inline-flex">Esc</kbd>
          <X size={18} className="md:hidden" aria-hidden="true" />
        </button>
      </div>

      {/* data-lenis-prevent: the wheel scrolls this list while page scrolling is paused */}
      <ul
        id="palette-list"
        role="listbox"
        aria-label="Results"
        data-lenis-prevent=""
        className="max-h-[min(52dvh,420px)] overflow-y-auto overscroll-contain p-2"
      >
        {results.length === 0 && (
          <li role="presentation" className="px-3 py-8 text-center text-sm text-muted">
            Nothing matches &ldquo;{query}&rdquo;. Try &ldquo;work&rdquo; or &ldquo;email&rdquo;.
          </li>
        )}
        {results.map((item, i) => {
          const heading = item.group !== lastGroup ? item.group : null;
          lastGroup = item.group;
          const isCopied = copied && item.copy;
          const on = i === active;
          const Icon = item.icon;
          return (
            <li key={`${item.group}-${item.label}`} role="presentation">
              {heading && <p className="label px-3 pb-1.5 pt-3">{heading}</p>}
              <div
                id={`palette-opt-${i}`}
                role="option"
                aria-selected={on}
                onPointerMove={() => !on && setActive(i)}
                onClick={() => run(item)}
                className={`relative flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-[9px] px-3 py-2.5 text-[15px] ${
                  on ? "bg-ink/[0.08]" : ""
                }`}
              >
                {on && (
                  <span aria-hidden="true" className="absolute inset-y-2.5 left-0 w-[2px] rounded-full bg-accent" />
                )}
                <span className="flex min-w-0 items-center gap-3">
                  <Icon size={16} aria-hidden="true" className={`shrink-0 ${on ? "text-ink" : "text-muted"}`} />
                  <span className="truncate">{isCopied ? "Copied" : item.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-[13px] text-muted">
                  {item.hint && <span className="hidden max-w-[220px] truncate sm:inline">{item.hint}</span>}
                  {item.external ? (
                    <ArrowUpRight size={13} aria-hidden="true" />
                  ) : (
                    on && <ArrowElbowDownLeft size={13} aria-hidden="true" />
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* key hints for keyboard users; the count is announced as the list filters */}
      <div className="hidden items-center justify-between gap-4 border-t border-ink/10 px-4 py-2.5 text-[12px] text-muted md:flex">
        <span className="flex items-center gap-4" aria-hidden="true">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↵</kbd>
            to select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">Esc</kbd>
            to close
          </span>
        </span>
        <span className="tabular-nums" aria-hidden="true">
          {count}
        </span>
      </div>
      <p className="sr-only" aria-live="polite">
        {query ? count : ""}
      </p>
    </dialog>
  );
}
