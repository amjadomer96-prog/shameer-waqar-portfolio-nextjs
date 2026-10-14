"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "@phosphor-icons/react";
import { fieldProps } from "@/lib/field";
import { EMAIL } from "@/lib/site";
import { scrollToId } from "@/components/motion/SmoothScroll";

// Who and where, then the line itself. Both live in the h1.
const INTRO = "Shameer Waqar, Full Stack Developer in Karachi";
const HEADLINE = [
  { text: "I build the app," },
  { text: "the API and" },
  { text: "everything between.", accent: true },
];

// Karachi's clock, so remote clients can see what time it is for me.
function LocalTime() {
  const [time, setTime] = useState(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ? `${time} local time` : "UTC+5"}</span>;
}

// The entrance is CSS (.rise in globals.css), so the headline paints as soon
// as the page arrives instead of waiting for JavaScript.
const at = (delay) => ({ style: { "--d": `${delay}s` } });

export default function Hero() {
  let word = 0;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] flex-col"
      {...fieldProps({ shape: "stack", anchor: "right", narrow: "top", alpha: 0.9 })}
    >
      <div className="wrap flex flex-1 items-end pb-10 pt-[36dvh] lg:items-center lg:pt-28">
        <div className="max-w-[46rem]" data-field-clear="">
          <h1
            id="hero-title"
            aria-label={`${INTRO}. ${HEADLINE.map((l) => l.text).join(" ")}`}
            className="text-[clamp(2.7rem,6.6vw,6.1rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
          >
            <span aria-hidden="true" {...at(0)} className="rise label mb-6 block font-normal leading-[1.5]">
              Shameer Waqar <span className="mx-2 text-ink/25">/</span> Full Stack Developer in Karachi
            </span>{" "}
            {HEADLINE.map((line) => (
              <span key={line.text} aria-hidden="true" className={`block ${line.accent ? "text-accent" : ""}`}>
                {line.text.split(" ").map((w) => {
                  const i = word++;
                  return (
                    <span key={i} className="rise rise-word inline-block whitespace-pre" style={{ "--d": `${(0.12 + i * 0.06).toFixed(2)}s` }}>
                      {w}{" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <p {...at(0.75)} className="rise mt-8 max-w-[52ch] text-[17px] leading-relaxed text-muted sm:text-lg">
            I&apos;m a full stack and mobile developer in Karachi, Pakistan. I
            take products from Figma to release: React Native and Flutter
            apps, React and Node.js behind them, and real-time 3D in the
            browser with Three.js.
          </p>

          <div {...at(0.85)} className="rise mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("work");
              }}
              className="btn btn-primary"
            >
              See the work
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
              Say hello
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
      <dl {...at(1)} className="rise grid gap-x-10 border-t border-ink/10 sm:grid-cols-3">
        {[
          ["Now", "Full Stack Developer, Legit Design Studio"],
          ["Based", null],
          ["Open to", "Freelance web and mobile projects"],
        ].map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-4 border-b border-ink/10 py-4 sm:border-b-0">
            <dt className="label w-16 shrink-0">{k}</dt>
            <dd className="text-[15px] text-ink/85">
              {v ?? (
                <>
                  Karachi, Pakistan <span className="text-muted">/</span> <LocalTime />
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      </div>
    </section>
  );
}
