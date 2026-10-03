import Image from "next/image";
import SplitWords from "@/components/motion/SplitWords";
import Reveal from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";

const TECH = [
  ["react", "React"],
  ["nodedotjs", "Node.js"],
  ["express", "Express"],
  ["mongodb", "MongoDB"],
  ["flutter", "Flutter"],
  ["expo", "Expo"],
  ["supabase", "Supabase"],
  ["dart", "Dart"],
  ["nextdotjs", "Next.js"],
  ["astro", "Astro"],
  ["typescript", "TypeScript"],
  ["javascript", "JavaScript"],
  ["python", "Python"],
  ["threedotjs", "Three.js"],
  ["tailwindcss", "Tailwind CSS"],
  ["vercel", "Vercel"],
  ["figma", "Figma"],
];

function Tags({ items }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {items.map((t) => (
        <span key={t} className="chip">
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-24 sm:py-28">
      <div className="wrap">
        <SplitWords
          as="h2"
          id="stack-title"
          className="max-w-[14ch] text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]"
          lines={[{ text: "What I build with" }]}
        />
      </div>

      {/* the page's one marquee: the tools behind the work */}
      <Reveal className="mt-12 sm:mt-16" y={10}>
        <div className="group mask-fade-x overflow-hidden py-4">
          <ul
            aria-label="Tools I use"
            className="flex w-max animate-marquee gap-12 pr-12 group-hover:[animation-play-state:paused]"
          >
            {[...TECH, ...TECH].map(([slug, name], i) => (
              <li
                key={`${slug}-${i}`}
                aria-hidden={i >= TECH.length ? "true" : undefined}
                className="flex shrink-0 items-center gap-3 text-[15px] font-medium text-muted"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${slug}/8F95A0`}
                  alt=""
                  width={22}
                  height={22}
                  loading="lazy"
                  className="h-[22px] w-[22px]"
                />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="wrap mt-12 grid gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-[auto_auto]">
        <Reveal className="lg:col-span-4" delay={0}>
          <Tilt max={4} className="spotlight card relative h-full min-h-[300px] overflow-hidden p-7 sm:p-9">
            <div className="relative z-10 max-w-[30rem]">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">Full-stack, MERN</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                React front ends on Node and Express APIs, data in MongoDB.
                Reusable components, wired end to end.
              </p>
              <Tags items={["React", "Node.js", "Express", "MongoDB", "REST APIs", "Frontend UI"]} />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-16 hidden w-[58%] rotate-[-6deg] overflow-hidden rounded-[12px] opacity-60 ring-1 ring-ink/10 [mask-image:linear-gradient(115deg,transparent_10%,#000_55%)] sm:block"
            >
              <Image src="/work/lds-library/finder.jpg" alt="" width={1440} height={900} sizes="40vw" className="block h-auto w-full" />
            </div>
          </Tilt>
        </Reveal>

        <Reveal className="lg:col-span-2 lg:row-span-2" delay={0.08}>
          <Tilt max={5} className="spotlight card relative flex h-full min-h-[420px] flex-col overflow-hidden p-7 sm:p-9">
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">Mobile apps</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                Flutter and React Native apps, from Figma screens to working
                flows.
              </p>
              <Tags items={["Flutter", "React Native", "Expo", "Navigation flows", "Gamified UI"]} />
            </div>
            <div className="relative mt-8 flex flex-1 items-end justify-center">
              <Image
                src="/images/shot-points.jpg"
                alt="SafaLife points screen"
                width={520}
                height={924}
                sizes="260px"
                className="-mb-24 w-[70%] max-w-[240px] rounded-[18px] shadow-[0_30px_60px_-24px_rgb(var(--shadow)/var(--shadow-alpha))] ring-1 ring-ink/10"
              />
            </div>
          </Tilt>
        </Reveal>

        <Reveal className="lg:col-span-4" delay={0.12}>
          <Tilt max={6} className="spotlight relative h-full min-h-[240px] overflow-hidden rounded-[20px] bg-accent/[0.09] p-7 ring-1 ring-inset ring-accent/25 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">AI and data</h3>
              <span className="whitespace-nowrap rounded-full bg-accent/15 px-3 py-1 text-[12px] font-medium text-accent">
                In progress
              </span>
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Diploma in AI at NED Academy, with Python at the core.
            </p>
            <Tags items={["Python", "Machine learning", "Deep learning", "Data visualization"]} />
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
