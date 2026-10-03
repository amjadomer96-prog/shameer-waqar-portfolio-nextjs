import { ArrowDown, EnvelopeSimple } from "@phosphor-icons/react/ssr";
import HeroVisual from "@/components/hero/HeroVisual";
import SplitWords from "@/components/motion/SplitWords";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { CONTACT_LABEL, EMAIL } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-24 lg:min-h-[100dvh] lg:pt-20"
    >
      {/* ambient light behind the 3D stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] top-[-10%] -z-10 h-[80vh] w-[75vw] rounded-full bg-[radial-gradient(closest-side,rgb(var(--accent)/0.16),transparent)] blur-2xl"
      />

      <div className="wrap grid items-center gap-y-6 lg:min-h-[calc(100dvh-5rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-x-6">
        <div className="relative z-10 pt-6 lg:pt-0">
          <Reveal y={14} delay={0.05}>
            <p className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-ink/[0.05] py-1.5 pl-3 pr-4 text-[13px] font-medium text-ink/80 ring-1 ring-inset ring-ink/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-live/60 motion-reduce:animate-none" />
                <span className="relative h-2 w-2 rounded-full bg-live" />
              </span>
              Open to freelance projects
            </p>
          </Reveal>

          <SplitWords
            as="h1"
            onLoad
            delay={0.15}
            className="text-[clamp(3.6rem,8.4vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.055em]"
            lines={[{ text: "Shameer" }, { text: "Waqar" }]}
          />

          <Reveal delay={0.45} y={18}>
            <p className="mt-8 max-w-[40ch] text-[17px] leading-relaxed text-muted sm:text-lg">
              <span className="font-medium text-ink">Full-stack and mobile developer</span>{" "}
              at Legit Design Studio. Fourth-year CS student studying AI on the
              side.
            </p>
          </Reveal>

          <Reveal delay={0.7} y={18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="btn btn-primary">
                  See the work
                  <ArrowDown size={16} weight="bold" aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
                  <EnvelopeSimple size={17} aria-hidden="true" />
                  {CONTACT_LABEL}
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="relative -mx-5 h-[400px] sm:-mx-8 sm:h-[520px] lg:-mr-24 lg:ml-0 lg:h-[min(680px,82dvh)]">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
