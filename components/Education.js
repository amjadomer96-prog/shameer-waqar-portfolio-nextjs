import SplitWords from "@/components/motion/SplitWords";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const EDU = [
  {
    degree: "BS Computer Science",
    school: "UIT University",
    note: "Currently in fourth year",
    date: "2023 - 2027",
  },
  {
    degree: "Diploma, Artificial Intelligence",
    school: "NED Academy",
    note: "Python, machine learning, deep learning, data visualization",
    date: "In progress",
  },
  {
    degree: "Intermediate",
    school: "Bahria College Karsaz",
    note: "A-1 grade",
    date: "2021 - 2023",
  },
  {
    degree: "Matriculation",
    school: "Cadet College Karachi",
    note: "A-1 grade",
    date: "2020 - 2021",
  },
];

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 sm:py-28">
      <div className="wrap">
        <SplitWords
          as="h2"
          id="education-title"
          className="text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1] tracking-[-0.045em]"
          lines={[{ text: "Where it started" }]}
        />

        <Stagger as="ol" className="mt-14 grid gap-x-10 gap-y-12 sm:mt-20 sm:grid-cols-2" gap={0.1}>
          {EDU.map((e) => (
            <StaggerItem as="li" key={e.degree} className="group border-t border-ink/10 pt-7">
              <p className="tabular font-mono text-[13px] text-accent">{e.date}</p>
              <h3 className="mt-4 text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-tight tracking-[-0.03em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5">
                {e.degree}
              </h3>
              <p className="mt-2 text-[16px] text-ink/85">{e.school}</p>
              <p className="mt-1 max-w-[42ch] text-[15px] leading-relaxed text-muted">{e.note}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
