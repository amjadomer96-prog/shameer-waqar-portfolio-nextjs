"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowsClockwise,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  Phone,
} from "@phosphor-icons/react";
import Tilt from "@/components/motion/Tilt";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE, PHONE_HREF } from "@/lib/site";
import { useReduced } from "@/components/motion/useReduced";

// A business card in 3D: tilts with the pointer, flips to show the contact details.
export default function ContactCard() {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReduced();

  const face =
    "backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[20px] p-7 sm:p-8";

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <Tilt max={10} className="preserve-3d relative rounded-[20px]">
        <motion.div
          className="preserve-3d relative aspect-[1.6/1] w-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 16 }}
        >
          {/* front */}
          <div
            inert={flipped}
            className={`${face} bg-ink text-bg shadow-[0_40px_80px_-30px_rgb(var(--shadow)/calc(var(--shadow-alpha)+0.15))]`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.55),transparent)] blur-2xl"
            />
            <div className="relative flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-bg font-mono text-sm font-semibold text-ink">
                SW
              </span>
              <span className="font-mono text-[12px] opacity-60">Karachi, PK</span>
            </div>
            <div className="relative">
              <p className="text-[clamp(1.6rem,4vw,2.2rem)] font-semibold leading-none tracking-[-0.04em]">
                Shameer Waqar
              </p>
              <p className="mt-2 text-[15px] opacity-70">Full-stack and mobile developer</p>
            </div>
          </div>

          {/* back */}
          <div
            inert={!flipped}
            className={`${face} bg-surface ring-1 ring-inset ring-ink/10 [transform:rotateY(180deg)] shadow-[0_40px_80px_-30px_rgb(var(--shadow)/calc(var(--shadow-alpha)+0.15))]`}
          >
            <p className="text-sm text-muted">Reach me directly</p>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2.5 break-all hover:text-accent">
                  <EnvelopeSimple size={18} className="shrink-0 text-accent" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2.5 hover:text-accent">
                  <Phone size={18} className="shrink-0 text-accent" aria-hidden="true" />
                  {PHONE}
                </a>
              </li>
              <li className="flex gap-5">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                  <GithubLogo size={18} className="text-accent" aria-hidden="true" />
                  GitHub
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent">
                  <LinkedinLogo size={18} className="text-accent" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </Tilt>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          className="btn btn-ghost btn-sm"
        >
          <ArrowsClockwise size={15} aria-hidden="true" />
          {flipped ? "Show the front" : "Flip for details"}
        </button>
      </div>
    </div>
  );
}
