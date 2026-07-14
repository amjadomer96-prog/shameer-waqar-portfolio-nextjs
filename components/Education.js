const EDU = [
  {
    degree: "BS Computer Science",
    school: "UIT University · currently in fourth year",
    date: "2023 – 2027",
  },
  {
    degree: "Diploma, Artificial Intelligence",
    school: "NED Academy · Python, ML, DL, data visualization",
    date: "—",
  },
  {
    degree: "Intermediate",
    school: "Bahria College Karsaz · A-1 Grade",
    date: "2021 – 2023",
  },
  {
    degree: "Matriculation",
    school: "Cadet College Karachi · A-1 Grade",
    date: "2020 – 2021",
  },
];

export default function Education() {
  return (
    <section
      className="border-y border-line bg-white py-[84px]"
      id="education"
    >
      <div className="mx-auto max-w-wrap px-7">
        <p className="eyebrow">$ cat education.log</p>
        <h2 className="mb-9 font-display text-[clamp(26px,3.2vw,36px)] font-semibold tracking-tight text-ink">
          Where it started
        </h2>

        <div className="reveal border-t border-line">
          {EDU.map((e) => (
            <div
              key={e.degree}
              className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-5"
            >
              <div>
                <b className="font-display text-[16.5px] font-semibold">
                  {e.degree}
                </b>
                <span className="mt-[3px] block text-[13.5px] text-slate">
                  {e.school}
                </span>
              </div>
              <span className="whitespace-nowrap font-mono text-[12.5px] text-blue">
                {e.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
