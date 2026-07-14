const STACK = [
  {
    title: "Full-Stack (MERN)",
    status: "shipped",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "Frontend UI"],
  },
  {
    title: "Mobile Development",
    status: "shipped",
    tags: ["Flutter", "Navigation flows", "Gamified UI", "Screen design"],
  },
  {
    title: "AI & Data",
    status: "progress",
    tags: [
      "Python",
      "Machine Learning basics",
      "Deep Learning fundamentals",
      "Data Visualization",
    ],
  },
  {
    title: "Prospect & Growth Research",
    status: "shipped",
    tags: [
      "Lead qualification",
      "Market research",
      "Competitor research",
      "LinkedIn outbound",
      "CRM reporting",
    ],
  },
];

export default function Stack() {
  return (
    <section className="py-[84px]" id="stack">
      <div className="mx-auto max-w-wrap px-7">
        <p className="eyebrow">$ cat stack.json</p>
        <h2 className="mb-9 font-display text-[clamp(26px,3.2vw,36px)] font-semibold tracking-tight text-ink">
          What I build with
        </h2>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
          {STACK.map((s) => (
            <div
              key={s.title}
              className="reveal rounded-md border border-line bg-white px-6 pb-[22px] pt-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <span
                  className={`status-chip ${
                    s.status === "shipped" ? "status-shipped" : "status-progress"
                  }`}
                >
                  <span className="chip-dot" />
                  {s.status === "shipped" ? "Shipped" : "In progress"}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
