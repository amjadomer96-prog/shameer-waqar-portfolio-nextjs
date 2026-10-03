"use client";

import { scrollToSection } from "@/components/world/state";
import SoundToggle from "./SoundToggle";

const LINKS = [
  { id: "ifund", label: "Work" },
  { id: "log", label: "Log" },
  { id: "contact", label: "Contact" },
];

// Fixed frame around the world: wordmark, index and sound.
export default function HudFrame() {
  const go = (id) => (e) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      {/* on phones the log scrolls under the frame, so fade it out behind the HUD */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#c3cad3] via-[#c3cad3]/80 to-transparent lg:hidden" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#d7dce2] via-[#d7dce2]/80 to-transparent lg:hidden" />
      <a
        href="#top"
        onClick={go("top")}
        className="gx-l pointer-events-auto absolute top-7 text-[26px] font-bold leading-none tracking-[-0.06em] text-ink sm:text-[30px]"
      >
        shameer<span className="text-accent">.</span>
      </a>

      <nav aria-label="Sections" className="gx-r pointer-events-auto absolute top-8 flex gap-5 sm:gap-7">
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} className="hud py-1 transition-opacity hover:opacity-60">
            {l.label}
          </a>
        ))}
      </nav>

      <div className="gx-l absolute bottom-6">
        <SoundToggle />
      </div>
    </div>
  );
}
