"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, LockSimple, X } from "@phosphor-icons/react";
import { PROJECTS } from "@/lib/projects";
import { OPEN_EVENT } from "@/components/world/state";
import AutoVideo from "./AutoVideo";

// Opened by clicking an ice block or its "Click to explore" button.
export default function ProjectDialog() {
  const ref = useRef(null);
  const [slug, setSlug] = useState(null);
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    const onOpen = (e) => setSlug(e.detail);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      window.__lenis?.stop();
    }
  }, [project]);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      onClose={() => {
        setSlug(null);
        window.__lenis?.start();
      }}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      aria-labelledby="project-dialog-title"
      className="project-dialog pointer-events-auto m-auto max-h-[92dvh] w-[min(1120px,94vw)] overflow-y-auto rounded-[20px] bg-[#e9edf2]/95 p-0 text-ink shadow-[0_60px_120px_-40px_rgb(var(--shadow)/0.6)] ring-1 ring-white/60 backdrop-blur-xl"
    >
      {project && (
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="hud hud-muted">
              {project.code} / D {project.date}
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="hud inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 ring-1 ring-inset ring-ink/20 hover:bg-ink/[0.06]"
            >
              <X size={13} weight="bold" aria-hidden="true" />
              Close
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10">
            <div>
              {project.video ? (
                <div className="overflow-hidden rounded-[12px] bg-black ring-1 ring-ink/10">
                  <div className="flex h-9 items-center justify-between bg-[#dde2e8] px-3.5">
                    <span className="truncate font-mono text-[11.5px] text-ink/60">{project.domain}</span>
                    <span className="flex items-center gap-1.5 font-mono text-[11.5px] text-ink/60">
                      <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
                      Live
                    </span>
                  </div>
                  <AutoVideo src={project.video} poster={project.poster} label={`${project.name} walkthrough`} />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {project.gallery?.map((g) => (
                    <Image
                      key={g.src}
                      src={g.src}
                      alt={`${project.name} ${g.label} screen`}
                      width={g.w}
                      height={g.h}
                      sizes="(min-width: 1024px) 300px, 45vw"
                      className="h-full w-full rounded-[12px] object-cover ring-1 ring-ink/10"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:py-2 lg:pr-2">
              <p className="hud hud-muted">{project.kind}</p>
              <h2
                id="project-dialog-title"
                className="mt-2 text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.045em]"
              >
                {project.name}
              </h2>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink/75">{project.summary}</p>
              <ul className="plus-list mt-6 space-y-3 text-[14.5px] leading-snug text-ink/85">
                {project.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    Visit live site
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5 text-[13px] text-ink/60">
                  <LockSimple size={14} aria-hidden="true" />
                  Private repository
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
