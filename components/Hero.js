import { GITHUB_URL, LINKEDIN_URL } from "./Nav";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-[76px] pt-[88px]">
      <div className="grid-bg" />
      <div className="relative z-10 mx-auto grid max-w-wrap grid-cols-1 gap-14 px-7 md:grid-cols-[1.15fr_0.85fr] md:items-start">
        <div>
          <p id="typewriter" className="eyebrow">
            $ whoami
          </p>
          <h1 className="font-display text-[38px] font-semibold leading-[1.02] tracking-tight text-ink sm:text-[48px] md:text-[60px]">
            Shameer Waqar
          </h1>
          <p className="mt-4 font-mono text-[15px] text-ink-2">
            <b className="font-medium text-blue">Developer Intern</b> · MERN
            &amp; Mobile — <b className="font-medium text-blue">Prospect
            Analyst</b> — AI/ML in progress
          </p>
          <p className="mt-6 max-w-[46ch] text-[17px] text-slate">
            Fourth-year Computer Science student in Karachi, currently
            building full-stack and mobile features at Legit Design Studio —
            and researching the SaaS, AI and Web3 founders who might need
            them next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a href="#experience" className="btn btn-solid">
              See the build log →
            </a>
            <a
              href="mailto:23FA-011-CS@students.uitu.edu.pk"
              className="btn"
            >
              Email me
            </a>
          </div>
        </div>

        <div className="frame reveal rounded-md border border-line bg-white px-6 pb-5 pt-6">
          <span className="tick tick-tl" />
          <span className="tick tick-tr" />
          <span className="tick tick-bl" />
          <span className="tick tick-br" />
          <p className="eyebrow">Spec sheet</p>

          <SpecRow k="LOCATION" v="Karachi, PK" first />
          <SpecRow k="ROLE" v="Dev Intern · Prospect Analyst" />
          <SpecRow k="CORE STACK" v="MERN + Flutter" />
          <SpecRow k="CURRENTLY" v="AI Diploma, NED Academy" />
          <SpecRow
            k="LINKS"
            v={
              <span className="inline-flex gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-2 underline decoration-line underline-offset-2 hover:text-blue"
                >
                  GitHub
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-2 underline decoration-line underline-offset-2 hover:text-blue"
                >
                  LinkedIn
                </a>
              </span>
            }
          />
          <SpecRow
            k="STATUS"
            v={
              <span className="inline-flex items-center">
                <span className="mr-[7px] inline-block h-[7px] w-[7px] rounded-full bg-green" />
                Open to internships &amp; freelance
              </span>
            }
          />
        </div>
      </div>
    </section>
  );
}

function SpecRow({ k, v, first }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-[11px] text-[13.5px] ${
        first ? "" : "border-t border-paper-dim"
      }`}
    >
      <span className="whitespace-nowrap font-mono tracking-wide text-slate">
        {k}
      </span>
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}
