"use client";

import { createContext, useContext, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

const SectionContext = createContext({ active: true });
export const useSection = () => useContext(SectionContext);

/*
  A tall scroll section whose HUD screen sticks to the viewport while the 3D
  camera flies through the matching part of the world. The HUD fades in and
  out at the edges. `flowOnMobile` lets long content scroll normally on phones.
*/
export default function Section({
  id,
  label,
  heightClass = "h-[150vh]",
  fadeIn = true,
  fadeOut = true,
  flowOnMobile = false,
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const range = fadeIn && fadeOut ? [0, 0.14, 0.86, 1] : fadeIn ? [0, 0.14, 1] : [0, 0.86, 1];
  const values = fadeIn && fadeOut ? [0, 1, 1, 0] : fadeIn ? [0, 1, 1] : [1, 1, 0];
  const opacity = useTransform(scrollYProgress, range, values);

  const [active, setActive] = useState(!fadeIn);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const on = (v > 0.05 || !fadeIn) && (v < 0.95 || !fadeOut);
    if (on !== active) setActive(on);
  });

  const screen = flowOnMobile
    ? "relative max-lg:!opacity-100 max-lg:px-0 max-lg:py-28 lg:sticky lg:top-0 lg:h-[100dvh] lg:overflow-hidden"
    : "sticky top-0 h-[100dvh] overflow-hidden";

  return (
    <section id={id} ref={ref} aria-label={label} className={`relative ${heightClass}`}>
      <SectionContext.Provider value={{ active }}>
        <motion.div style={{ opacity }} className={`pointer-events-none ${screen}`}>
          {children}
        </motion.div>
      </SectionContext.Provider>
    </section>
  );
}
