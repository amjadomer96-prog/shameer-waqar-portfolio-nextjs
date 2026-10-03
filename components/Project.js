import Image from "next/image";
import { LockSimple } from "@phosphor-icons/react/ssr";
import { SAFALIFE_SHOTS } from "@/lib/projects";
import SplitWords from "@/components/motion/SplitWords";
import Reveal from "@/components/motion/Reveal";
import Coverflow from "@/components/safalife/Coverflow";

const POINTS = [
  "Designed and built the mobile screens for daily habit tracking and rewards.",
  "Built the navigation flows that connect streaks, points and progress states.",
  "Node, Express and MongoDB API with scheduled jobs for the daily rollover and reminders.",
  "Ran user-flow testing to keep the gamified experience smooth end to end.",
];

const TAGS = ["Flutter", "Node.js", "Express", "MongoDB", "Reward and streak UI"];

export default function Project() {
  return (
    <section id="project" aria-labelledby="safalife-title" className="relative isolate overflow-hidden py-24 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[8%] left-1/2 -z-10 h-[55%] w-[80%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.12),transparent)] blur-2xl"
      />
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <Reveal y={16}>
              <div className="mb-6 flex items-center gap-4">
                <Image
                  src="/images/app-icon.png"
                  alt="SafaLife app icon"
                  width={56}
                  height={56}
                  className="rounded-[14px] shadow-[0_14px_30px_-12px_rgb(var(--shadow)/var(--shadow-alpha))]"
                />
                <p className="text-sm text-muted">Habit-building app, gamified</p>
              </div>
            </Reveal>
            <SplitWords
              as="h2"
              id="safalife-title"
              className="text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]"
              lines={[{ text: "SafaLife" }]}
            />
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-muted">
                An Islamic habit-building app around Salah, Quran, Dhikr and
                Charity. Streaks, points and rewards make consistency feel like
                progress, not pressure.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:pt-20">
            <ul className="plus-list max-w-[52ch] space-y-3 text-[15px] leading-snug text-ink/85">
              {POINTS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              {TAGS.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-muted">
              <LockSimple size={14} aria-hidden="true" />
              Private repository
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="mt-14 sm:mt-16">
          <div className="overflow-hidden">
            <Coverflow shots={SAFALIFE_SHOTS} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
