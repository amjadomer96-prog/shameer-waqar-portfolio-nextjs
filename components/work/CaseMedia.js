import Image from "next/image";
import AutoVideo from "@/components/showcase/AutoVideo";
import TiltFrame from "@/components/work/TiltFrame";

// The work itself, shown flat and at full sharpness. One layout per kind of
// product: phone screens, a site recording, or a stack of app screens.

const PHONE = "rounded-[1.7rem] bg-[#15171c] p-[5px] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.9)] ring-1 ring-white/[0.14]";

function Heading({ id, children }) {
  return (
    <h2 id={id} className="label">
      {children}
    </h2>
  );
}

// iFund: every screen in order, with what it does. A swipeable row on phones,
// a staggered grid from tablet up.
function Screens({ project }) {
  return (
    <section aria-labelledby="media-title" className="py-16 sm:py-24">
      <div className="wrap">
        <Heading id="media-title">The app, screen by screen</Heading>
      </div>
      <ol
        tabIndex={0}
        aria-labelledby="media-title"
        className="mt-8 flex snap-x snap-mandatory scroll-px-[var(--gx)] gap-5 overflow-x-auto px-[var(--gx)] pb-4 outline-none focus-visible:ring-2 focus-visible:ring-accent sm:mx-auto sm:grid sm:max-w-wrap sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 sm:overflow-visible sm:pb-16 lg:gap-x-14 sm:[&>li:nth-child(3n+2)]:translate-y-16"
      >
        {project.screens.map((s, i) => (
          <li key={s.src} className="w-[68vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none">
            <figure>
              <TiltFrame index={i}>
                <div className={PHONE}>
                  <Image
                    src={s.src}
                    alt={`iFund app: ${s.label} screen`}
                    width={780}
                    height={1688}
                    sizes="(min-width: 1240px) 340px, (min-width: 640px) 30vw, 68vw"
                    quality={90}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="block h-auto w-full rounded-[1.4rem]"
                  />
                </div>
              </TiltFrame>
              <figcaption className="mt-4 text-[15px] leading-snug">
                <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="ml-2 font-medium">{s.label}</span>
                <span className="mt-1 block text-muted">{s.line}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}

// LDS Library and Amariya: the site recording in a browser frame, with the
// phone layout beside it.
function Site({ project }) {
  return (
    <section aria-labelledby="media-title" className="py-16 sm:py-24">
      <div className="wrap">
        <Heading id="media-title">The site in use</Heading>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10">
          <figure>
            <TiltFrame tilt={false}>
              <div className="browser">
                <div className="browser-bar">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                  </span>
                  <span className="truncate font-mono text-[12px] text-muted">{project.domain}</span>
                </div>
                <AutoVideo
                  src={project.video}
                  poster={project.poster}
                  captions={project.captions}
                  label={`${project.name} walkthrough`}
                />
              </div>
            </TiltFrame>
            <figcaption className="mt-3 text-[14px] text-muted">
              A screen recording of the live site, without sound.
            </figcaption>
          </figure>
          <figure className="mx-auto w-[52%] max-w-[240px] lg:w-full">
            <TiltFrame index={1}>
              <div className={PHONE}>
                <Image
                  src={project.mobile}
                  alt={`${project.name} home page on a phone`}
                  width={390}
                  height={844}
                  sizes="240px"
                  quality={90}
                  loading="eager"
                  className="block h-auto w-full rounded-[1.4rem]"
                />
              </div>
            </TiltFrame>
            <figcaption className="mt-3 text-[14px] text-muted">The same page on a phone.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

// SafaLife: the app's screens at their own heights, in columns.
function Deck({ project }) {
  return (
    <section aria-labelledby="media-title" className="py-16 sm:py-24">
      <div className="wrap">
        <Heading id="media-title">The app, habit by habit</Heading>
        <ul className="mt-8 columns-2 gap-5 sm:gap-8 md:columns-3">
          {project.deck.map((shot, i) => (
            <li key={shot.src} className="mb-5 break-inside-avoid sm:mb-8">
              <figure>
                <TiltFrame index={i}>
                  <Image
                    src={shot.src}
                    alt={`SafaLife ${shot.label} screen`}
                    width={shot.w}
                    height={shot.h}
                    sizes="(min-width: 768px) 360px, 45vw"
                    quality={90}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="block h-auto w-full rounded-[14px] ring-1 ring-ink/10"
                  />
                </TiltFrame>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 text-[14px]">
                  <span className="font-medium">{shot.label}</span>
                  <span className="font-mono text-[12px] text-accent">+{shot.points} pts</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function CaseMedia({ project }) {
  if (project.screens) return <Screens project={project} />;
  if (project.video) return <Site project={project} />;
  if (project.deck) return <Deck project={project} />;
  return null;
}
