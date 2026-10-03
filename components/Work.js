import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { ALSO_SHIPPED, PROJECTS } from "@/lib/projects";
import SplitWords from "@/components/motion/SplitWords";
import Reveal, { Stagger, StaggerItem } from "@/components/motion/Reveal";
import ProjectStack from "@/components/work/ProjectStack";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative pb-24 pt-28 sm:pt-36">
      <div className="wrap">
        <div className="mb-14 max-w-[720px] sm:mb-20">
          <SplitWords
            as="h2"
            id="work-title"
            className="text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]"
            lines={[{ text: "Recent work" }]}
          />
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
              Live builds from the last few months. Every card links to the real
              thing.
            </p>
          </Reveal>
        </div>

        <ProjectStack projects={PROJECTS} />

        <div className="mt-24 sm:mt-32">
          <Reveal>
            <h3 className="mb-6 text-sm font-medium text-muted">Also shipped</h3>
          </Reveal>
          <Stagger className="grid gap-px overflow-hidden rounded-[20px] bg-ink/10 ring-1 ring-inset ring-ink/10 sm:grid-cols-2">
            {ALSO_SHIPPED.map((item) => (
              <StaggerItem key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-6 bg-surface p-6 transition-colors duration-300 hover:bg-surface-2 sm:p-8"
                >
                  <div>
                    <p className="text-xl font-semibold tracking-[-0.02em]">{item.name}</p>
                    <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
                      {item.line}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    {item.cta} on GitHub
                    <ArrowUpRight
                      size={15}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
