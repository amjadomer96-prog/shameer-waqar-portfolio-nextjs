"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/world/World"), { ssr: false });

// "pending" on the server and first paint, then "webgl" or "static".
const ModeContext = createContext("pending");
export const useWorldMode = () => useContext(ModeContext);

function supportsWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

function Loader({ progress, done }) {
  const num = useRef(null);
  const bar = useRef(null);
  const shown = useRef(0);

  useEffect(() => {
    let raf;
    const tick = () => {
      shown.current += (progress - shown.current) * 0.08;
      const v = Math.min(99, Math.round(shown.current * 100));
      if (num.current) num.current.textContent = String(done ? 100 : v).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${done ? 1 : shown.current})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress, done]);

  return (
    <div
      aria-hidden="true"
      className={`world-loader fixed inset-0 z-40 grid place-items-center bg-[#c3cad3] transition-opacity duration-1000 ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-[min(280px,70vw)]">
        <div className="hud flex justify-between">
          <span>Shameer Waqar</span>
          <span>
            <span ref={num}>000</span>%
          </span>
        </div>
        <div className="mt-3 h-px w-full bg-ink/15">
          <div ref={bar} className="h-px w-full origin-left scale-x-0 bg-ink" />
        </div>
        <p className="hud hud-muted mt-3">Freezing the work</p>
      </div>
    </div>
  );
}

// Frost backdrop used when WebGL is unavailable or motion is reduced.
function StaticBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#e3e7ec,#b8c0cb_72%)]"
    />
  );
}

export default function Experience({ children }) {
  const [mode, setMode] = useState("pending");
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(!reduce && supportsWebGL2() ? "webgl" : "static");
  }, []);

  // pause rendering while the tab is hidden
  useEffect(() => {
    const onVis = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onReady = useCallback(() => setTimeout(() => setReady(true), 400), []);

  return (
    <ModeContext.Provider value={mode}>
      {mode === "webgl" ? (
        <World onReady={onReady} onProgress={setProgress} active={active} />
      ) : (
        <StaticBackdrop />
      )}
      <Loader progress={progress} done={mode === "static" || ready} />
      <noscript>
        <style>{".world-loader{display:none}"}</style>
      </noscript>
      {/* content ignores the pointer so the 3D world behind stays interactive;
          real controls opt back in with pointer-events-auto */}
      <div className="pointer-events-none relative z-10">{children}</div>
    </ModeContext.Provider>
  );
}
