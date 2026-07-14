import Image from "next/image";

const GALLERY = [
  { src: "/images/shot-salah.jpg", label: "Salah", w: 520, h: 650 },
  { src: "/images/shot-quran.jpg", label: "Quran", w: 520, h: 924 },
  { src: "/images/shot-dhikr.jpg", label: "Dhikr", w: 520, h: 924 },
  { src: "/images/shot-charity.jpg", label: "Charity", w: 520, h: 924 },
  { src: "/images/shot-points.jpg", label: "Points", w: 520, h: 924 },
  { src: "/images/shot-iftar.jpg", label: "Iftar", w: 520, h: 650 },
];

export default function Project() {
  return (
    <section className="py-[84px]" id="project">
      <div className="mx-auto max-w-wrap px-7">
        <p className="eyebrow">$ open safalife/</p>

        <div className="frame reveal mb-11 mt-2 overflow-hidden rounded-md border border-line bg-white">
          <span className="tick tick-tl" />
          <span className="tick tick-tr" />
          <span className="tick tick-bl" />
          <span className="tick tick-br" />
          <Image
            src="/images/feature-graphic.jpg"
            alt="SafaLife app overview — Salah, Charity, Dhikr and Quran tracking cards"
            width={1024}
            height={500}
            className="block h-auto w-full"
          />
        </div>

        <div className="reveal mb-11 max-w-[680px]">
          <h2 className="mb-4 flex items-center gap-3.5 font-display text-[clamp(24px,3vw,32px)] font-semibold tracking-tight text-ink">
            <Image
              src="/images/app-icon.png"
              alt="SafaLife app icon"
              width={36}
              height={36}
              className="shrink-0 rounded-[10px] shadow-[0_6px_14px_-6px_rgba(11,36,69,0.45)]"
            />
            SafaLife — habit-building, gamified
          </h2>
          <p className="mb-5 max-w-[58ch] text-[15.5px] text-slate">
            An Islamic habit-building app built around Salah, Quran, Dhikr and
            Charity — turned into streaks, points and rewards so consistency
            feels like progress, not pressure. I worked on the mobile
            screens, navigation flows and the reward UI that makes a streak
            feel worth keeping.
          </p>
          <ul className="diff mb-[22px] max-w-[58ch]">
            <li>
              Designed and built mobile screens for daily habit tracking and
              rewards.
            </li>
            <li>
              Built navigation flows connecting streaks, points and progress
              states.
            </li>
            <li>
              Ran user-flow testing to keep the gamified experience smooth
              end-to-end.
            </li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <span className="tag">Flutter</span>
            <span className="tag">Mobile UI</span>
            <span className="tag">Navigation flows</span>
            <span className="tag">Reward / streak UI</span>
            <span className="tag">User-flow testing</span>
          </div>
        </div>

        <p className="mb-3.5 font-mono text-xs text-slate">
          // swipe through the app
        </p>
        <div className="gallery reveal">
          {GALLERY.map((g) => (
            <div className="gallery-item" key={g.label}>
              <Image
                src={g.src}
                alt={`SafaLife ${g.label} screen`}
                width={g.w}
                height={g.h}
              />
              <div className="gallery-cap">{g.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
