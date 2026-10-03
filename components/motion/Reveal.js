"use client";

import { motion } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

const EASE = [0.16, 1, 0.3, 1];

// Fade + rise when the element enters the viewport.
export default function Reveal({
  as = "div",
  children,
  delay = 0,
  y = 28,
  className,
  amount = 0.25,
  ...rest
}) {
  const reduce = useReduced();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transitionEnd: { filter: "none" },
      }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Children cascade in one after another.
export function Stagger({ as = "div", children, className, gap = 0.08, amount = 0.2 }) {
  const reduce = useReduced();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ as = "div", children, className, y = 24 }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </Tag>
  );
}
