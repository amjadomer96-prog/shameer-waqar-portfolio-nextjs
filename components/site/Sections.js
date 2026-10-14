import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { fieldProps } from "@/lib/field";
import { ALSO_SHIPPED, PROJECTS } from "@/lib/projects";
import { ABOUT, CAPABILITIES, EDUCATION, FAQ, ROLES } from "@/lib/profile";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, PHONE, PHONE_HREF, SOURCE_URL } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import CopyEmail from "@/components/contact/CopyEmail";
import Magnetic from "@/components/motion/Magnetic";
import WorkIndex from "@/components/site/WorkIndex";
import Wordmark from "@/components/site/Wordmark";

const H2 = "text-[clamp(2rem,4.6vw,3.6rem)] font-semibold leading-[1] tracking-[-0.045em]";

export function WorkIntro() {
  return (
    // a faint backdrop here, so the cloud never sits bright behind the index
    <div id="work" className="wrap pb-20 pt-28 sm:pb-28 sm:pt-36" {...fieldProps({ shape: "wave", anchor: "back", alpha: 0.1 })}>
      <Reveal>
        <p className="label">Selected work</p>
        <h2 className={`mt-4 max-w-[18ch] ${H2}`}>Four products, shown the way they&apos;re used.</h2>
        <p className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-muted">
          Every screen and recording is the real app or site. Scroll through
          each one here, or open its case study for the brief, the build and
          the stack.
        </p>
      </Reveal>
      <WorkIndex />
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative border-t border-ink/10 py-28 sm:py-36"
      {...fieldProps({ shape: "wave", anchor: "back", alpha: 0.13 })}
    >
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <p className="label">About</p>
            <h2 id="about-title" className={`mt-4 max-w-[17ch] ${H2}`}>
              {ABOUT.heading}
            </h2>
            <div className="mt-7 max-w-[60ch] space-y-4 text-[17px] leading-relaxed text-ink/80">
              {ABOUT.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 self-end">
            {ABOUT.facts.map((fact, i) => (
              <Reveal key={fact.label} delay={0.06 * i} className="flex flex-col border-t border-ink/10 pt-4">
                <dt className="order-2 mt-2 text-[14px] leading-snug text-muted">{fact.label}</dt>
                <dd className="font-mono text-[clamp(2rem,3.6vw,3rem)] font-medium leading-none tracking-[-0.04em] tabular-nums">
                  {fact.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <h3 className="label mt-20">What I do</h3>
        <ul className="mt-5 border-t border-ink/10">
          {CAPABILITIES.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={0.05 * i}
              className="grid gap-x-10 gap-y-2 border-b border-ink/10 py-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]"
            >
              <p className="text-[1.3rem] font-semibold tracking-[-0.03em]">{c.title}</p>
              <p className="max-w-[62ch] text-[16px] leading-relaxed text-ink/80">{c.line}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Path() {
  return (
    <section
      id="path"
      aria-labelledby="path-title"
      className="relative border-t border-ink/10 py-28 sm:py-36"
      {...fieldProps({ shape: "wave", anchor: "back", alpha: 0.12 })}
    >
      <div className="wrap">
        <Reveal>
          <p className="label">Path</p>
          <h2 id="path-title" className={`mt-4 max-w-[18ch] ${H2}`}>
            Intern in February, full-time by September.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h3 className="label">Experience</h3>
            <p className="sr-only">Most recent first.</p>
            <ol className="mt-5">
              {ROLES.map((r, i) => (
                <Reveal as="li" key={r.title} delay={0.06 * i} className="border-t border-ink/10 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="text-[1.3rem] font-semibold tracking-[-0.03em]">{r.title}</p>
                    <p className="font-mono text-[13px] text-muted">{r.period}</p>
                  </div>
                  <p className="mt-1 text-[15px] text-accent">{r.org}</p>
                  <ul className="plus-list mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink/80">
                    {r.lines.map((l) => (
                      <li key={l}>{l}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="label">Education</h3>
            <ol className="mt-5">
              {EDUCATION.map((e, i) => (
                <Reveal
                  as="li"
                  key={e.title}
                  delay={0.05 * i}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-ink/10 py-4"
                >
                  <div>
                    <p className="text-[16px] font-medium tracking-[-0.01em]">{e.title}</p>
                    <p className="mt-0.5 text-[14px] text-muted">{e.org}</p>
                  </div>
                  <p className="font-mono text-[13px] text-muted">{e.period}</p>
                </Reveal>
              ))}
            </ol>

            <h3 className="label mt-12">Also shipped</h3>
            <ul className="mt-5">
              {ALSO_SHIPPED.map((a) => (
                <li key={a.name} className="border-t border-ink/10">
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-6 py-4 transition-colors duration-150 hover:text-accent"
                  >
                    <span>
                      <span className="block text-[16px] font-medium tracking-[-0.01em]">{a.name}</span>
                      <span className="mt-0.5 block text-[14px] text-muted">{a.line}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 transition-transform duration-150 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative border-t border-ink/10 py-28 sm:py-36"
      {...fieldProps({ shape: "wave", anchor: "back", alpha: 0.1 })}
    >
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <p className="label">Questions</p>
          <h2 id="faq-title" className={`mt-4 max-w-[12ch] ${H2}`}>
            Before you get in touch.
          </h2>
          <p className="mt-5 max-w-[30ch] text-[16px] leading-relaxed text-muted">
            Something I haven&apos;t covered?
            <br />
            Ask me directly.
          </p>
          <a href={`mailto:${EMAIL}`} className="btn btn-ghost mt-6">
            Say hello
          </a>
        </Reveal>
        <div className="border-t border-ink/10">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={0.04 * i} className="border-b border-ink/10 py-7">
              <h3 className="text-[1.2rem] font-semibold tracking-[-0.025em]">{item.q}</h3>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-relaxed text-ink/80">{item.a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CHANNELS = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Phone", value: PHONE, href: PHONE_HREF },
  { label: "LinkedIn", value: "shameer-waqar", href: LINKEDIN_URL, external: true },
  { label: "GitHub", value: "amjadomer96-prog", href: GITHUB_URL, external: true },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative border-t border-ink/10 py-28 sm:py-40"
      {...fieldProps({ shape: "monogram", anchor: "right", alpha: 0.85 })}
    >
      <div className="wrap">
        <div className="max-w-[40rem]" data-field-clear="">
          <Reveal>
            <p className="label">Contact</p>
            <h2
              id="contact-title"
              className="mt-4 text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.05em]"
            >
              Have a product to build?
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17px] leading-relaxed text-muted sm:text-lg">
              I&apos;m open to freelance MERN and mobile builds, and early AI
              product work. Based in Karachi, comfortable working remote.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                  Say hello
                </a>
              </Magnetic>
              <CopyEmail email={EMAIL} className="btn btn-ghost" />
            </div>
          </Reveal>

          <ul className="mt-14 border-t border-ink/10">
            {CHANNELS.map((c, i) => (
              <Reveal as="li" key={c.label} delay={0.05 * i} className="border-b border-ink/10">
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-baseline justify-between gap-6 py-4 transition-colors duration-150 hover:text-accent"
                >
                  <span className="label w-20 shrink-0 group-hover:text-accent">{c.label}</span>
                  <span className="min-w-0 flex-1 text-[16px] [overflow-wrap:anywhere]">{c.value}</span>
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 translate-y-0.5 text-muted transition-transform duration-150 ease-snap group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const FOOTER_LINK = "flex min-h-11 items-center transition-colors duration-150 hover:text-ink md:min-h-8";

export function Footer() {
  return (
    // the contact cloud fades to a trace here, so it never sits behind the links
    <footer
      className="relative overflow-hidden border-t border-ink/10 pt-12"
      {...fieldProps({ shape: "monogram", anchor: "right", alpha: 0.06 })}
    >
      <div className="wrap grid gap-10 text-[14px] text-muted sm:grid-cols-2 md:grid-cols-[minmax(0,1fr)_auto_auto] md:gap-20">
        <div className="sm:col-span-2 md:col-span-1">
          <a href="/" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-ink md:min-h-8">
            <span className="font-mono text-accent" aria-hidden="true">
              +
            </span>
            Shameer Waqar
          </a>
          <p className="mt-2 max-w-[36ch] leading-relaxed">Full stack and mobile developer.</p>
          <p className="mt-1 max-w-[36ch] leading-relaxed">&copy; 2026 Shameer Waqar. Designed and built in Karachi.</p>
        </div>
        <nav aria-label="Case studies">
          <p className="label">Case studies</p>
          <ul className="mt-3">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <a href={`/work/${p.slug}`} className={FOOTER_LINK}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Elsewhere">
          <p className="label">Elsewhere</p>
          <ul className="mt-3">
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                GitHub
              </a>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK}>
                Site source
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <Wordmark />
    </footer>
  );
}
