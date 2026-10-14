import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/ssr";
import { PROJECTS } from "@/lib/projects";
import { fieldProps, hexToTriplet } from "@/lib/field";
import { NAME, caseStudyJsonLd, caseStudyUrl, social } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import Field from "@/components/field/Field";
import Header from "@/components/site/Header";
import CommandPalette from "@/components/site/CommandPalette";
import { Contact, Footer } from "@/components/site/Sections";
import { ProjectDetails } from "@/components/showcase/ProjectParts";
import CaseMedia from "@/components/work/CaseMedia";

// One page per project. Only the four projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const find = (slug) => PROJECTS.find((p) => p.slug === slug);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = find(slug);
  if (!project) return {};
  const { title, description } = project.seo;
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    ...social({
      title: `${title} | ${NAME}`,
      description,
      url: caseStudyUrl(slug),
      type: "article",
      images: [{ url: `/og/${slug}.jpg`, width: 1200, height: 630, alt: `${project.name}: ${project.headline}` }],
    }),
  };
}

const H2 = "text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1] tracking-[-0.045em]";

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = find(slug);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const facts = [
    ["Role", project.role],
    ["Year", <time dateTime={project.year}>{project.year}</time>],
    ["Platform", project.platform],
  ];

  return (
    <>
      <JsonLd data={caseStudyJsonLd(project)} />
      <Field />
      <div className="relative z-10" style={{ "--accent": hexToTriplet(project.accent) }}>
        <Header />
        <main id="main">
          <section
            id="top"
            aria-labelledby="case-title"
            className="relative pb-6 pt-28 sm:pt-36 lg:pt-40"
            {...fieldProps({ shape: project.shape, accent: project.accent, anchor: "right", alpha: 0.6 })}
          >
            <div className="wrap">
              <div className="max-w-[44rem]" data-field-clear="">
                <nav aria-label="Breadcrumb">
                  <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1">
                    <li>
                      <a href="/" className="inline-flex min-h-11 items-center hover:text-ink md:min-h-0">
                        {NAME}
                      </a>
                    </li>
                    <li aria-hidden="true" className="text-ink/25">
                      /
                    </li>
                    <li>
                      <a href="/#work" className="inline-flex min-h-11 items-center hover:text-ink md:min-h-0">
                        Work
                      </a>
                    </li>
                    <li aria-hidden="true" className="text-ink/25">
                      /
                    </li>
                    <li aria-current="page" className="text-accent">
                      {project.name}
                    </li>
                  </ol>
                </nav>

                <h1 id="case-title" className="mt-6 md:mt-8">
                  <span className="rise block text-[clamp(3rem,8.4vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
                    {project.name}
                  </span>{" "}
                  <span
                    className="rise mt-4 block max-w-[24ch] text-[clamp(1.4rem,2.8vw,2.2rem)] font-medium leading-[1.12] tracking-[-0.035em] text-muted"
                    style={{ "--d": "0.12s" }}
                  >
                    {project.headline}
                  </span>
                </h1>
                <p
                  className="rise mt-8 max-w-[60ch] text-[17px] leading-relaxed text-ink/80 sm:text-lg"
                  style={{ "--d": "0.24s" }}
                >
                  {project.intro}
                </p>

                <dl className="rise mt-12 grid border-t border-ink/10 sm:grid-cols-2" style={{ "--d": "0.36s" }}>
                  {facts.map(([k, v]) => (
                    <div key={k} className="border-b border-ink/10 py-4 sm:pr-8">
                      <dt className="label">{k}</dt>
                      <dd className="mt-2 text-[15px] leading-snug text-ink/85">{v}</dd>
                    </div>
                  ))}
                  <div className="border-b border-ink/10 py-4">
                    <dt className="label">Live</dt>
                    <dd className="mt-2 text-[15px] leading-snug">
                      {project.live ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-accent hover:underline"
                        >
                          {project.domain}
                          <ArrowUpRight size={14} aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <span className="text-muted">No public link</span>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* the cloud settles into a faint backdrop behind the work and the text */}
          <div {...fieldProps({ shape: "wave", accent: project.accent, anchor: "back", alpha: 0.1 })}>
            <CaseMedia project={project} />

            <section aria-label="Brief and result" className="border-t border-ink/10 py-20 sm:py-28">
              <div className="wrap grid gap-12 md:grid-cols-2 md:gap-16">
                <div>
                  <h2 className="label">The brief</h2>
                  <p className="mt-5 max-w-[34ch] text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.025em]">
                    {project.brief}
                  </p>
                </div>
                <div>
                  <h2 className="label">The result</h2>
                  <p className="mt-5 max-w-[34ch] text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-[1.25] tracking-[-0.025em] text-ink/80">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="built-title" className="border-t border-ink/10">
              <div className="wrap pt-20 sm:pt-28">
                <p className="label">Features</p>
                <h2 id="built-title" className={`mt-4 ${H2}`}>
                  What I built.
                </h2>
              </div>
              <ProjectDetails project={project} caseStudy={false} />
            </section>

            <section aria-labelledby="next-title" className="border-t border-ink/10" style={{ "--accent": hexToTriplet(next.accent) }}>
              <a href={`/work/${next.slug}`} className="group wrap flex items-end justify-between gap-8 py-20 sm:py-28">
                <span>
                  <span id="next-title" className="label block">
                    Next case study
                  </span>
                  <span className="mt-4 block text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-colors duration-200 group-hover:text-accent">
                    {next.name}
                  </span>
                  <span className="mt-3 block text-[17px] text-muted">{next.headline}</span>
                </span>
                <ArrowRight
                  size={44}
                  aria-hidden="true"
                  className="mb-2 shrink-0 text-muted transition-transform duration-200 ease-snap group-hover:translate-x-1.5 group-hover:text-accent"
                />
              </a>
            </section>
          </div>

          <Contact />
        </main>
        <Footer />
      </div>
      <CommandPalette />
    </>
  );
}
