import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import SplitWords from "@/components/motion/SplitWords";
import Reveal from "@/components/motion/Reveal";
import Timeline from "@/components/experience/Timeline";

const ROLES = [
  {
    title: "Full Stack Developer",
    meta: "Sep 2026 to now",
    items: [
      "Building the iFund mobile app in Expo and React Native, on a Supabase backend.",
      "Shipping full-stack features with React, Node.js, Express and MongoDB.",
      "Built LDS Library, the studio's design reference site, in Astro.",
    ],
  },
  {
    title: "Developer Intern",
    meta: "Feb 2026 to Sep 2026",
    items: [
      "Built SafaLife screens: navigation flows, progress UI and reward states.",
      "Started on the iFund mobile app, turning the Figma designs into screens.",
      "Practiced reusable components and frontend-to-backend integration.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-28">
      <div className="wrap">
        <SplitWords
          as="h2"
          id="experience-title"
          className="max-w-[16ch] text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]"
          lines={[{ text: "Where I'm building it" }]}
        />

        <div className="mt-14 grid gap-12 sm:mt-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="self-start lg:sticky lg:top-32">
            <p className="tabular font-mono text-[13px] text-accent">Feb 2026 to now</p>
            <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.035em]">
              Legit Design Studio
            </h3>
            <p className="mt-3 max-w-[38ch] text-[17px] leading-relaxed text-muted">
              Joined as a developer intern in February 2026 and became a
              permanent full-stack developer in September.
            </p>
            <a
              href="https://legitdesign.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-accent"
            >
              legitdesign.studio
              <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
            </a>
          </Reveal>

          <Timeline groups={ROLES} />
        </div>
      </div>
    </section>
  );
}
