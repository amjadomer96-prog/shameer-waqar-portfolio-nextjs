export default function Experience() {
  return (
    <section
      className="border-y border-line bg-white py-[84px]"
      id="experience"
    >
      <div className="mx-auto max-w-wrap px-7">
        <p className="eyebrow">$ git log --experience</p>
        <h2 className="mb-9 font-display text-[clamp(26px,3.2vw,36px)] font-semibold tracking-tight text-ink">
          Where I&apos;m building it
        </h2>

        <div className="reveal">
          <div className="mb-[22px] flex flex-wrap items-baseline gap-x-[18px] gap-y-3">
            <div>
              <h3 className="font-display text-[22px] font-semibold text-ink">
                Legit Design Studio
              </h3>
              <div className="text-[14.5px] text-slate">
                Developer Intern (MERN &amp; Mobile) + Prospect Analyst
              </div>
            </div>
            <span className="ml-auto rounded-full bg-ink px-[11px] py-[5px] font-mono text-[12.5px] text-white">
              feb 2026 → present
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 font-mono text-[11.5px] uppercase tracking-wide text-slate">
                // build
              </p>
              <ul className="diff">
                <li>
                  Building full-stack features with React, Node.js, Express
                  and MongoDB.
                </li>
                <li>
                  Shipping SafaLife screens — navigation flows, progress UI,
                  reward states.
                </li>
                <li>
                  Practicing reusable components and frontend-to-backend
                  integration.
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11.5px] uppercase tracking-wide text-slate">
                // research
              </p>
              <ul className="diff">
                <li>
                  Researching SaaS, AI and Web3 founders to flag qualified
                  outbound prospects.
                </li>
                <li>
                  Auditing startup sites for clarity, UX and conversion gaps
                  before outreach.
                </li>
                <li>
                  Writing founder-specific outreach notes and tracking weekly
                  pipeline activity.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
