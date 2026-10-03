"use client";

import { motion } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

const EASE = [0.16, 1, 0.3, 1];

/*
  Headline where each word slides up from behind a mask.
  `lines` is an array of { text, className } so a line can be styled on its own.
  Screen readers get the plain sentence through aria-label.
*/
export default function SplitWords({
  as = "h2",
  id,
  lines,
  className,
  delay = 0,
  stagger = 0.06,
  onLoad = false,
}) {
  const reduce = useReduced();
  const Tag = motion[as] ?? motion.h2;
  const label = lines.map((l) => l.text).join(" ");
  let index = 0;

  const trigger = onLoad
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.6 } };

  return (
    <Tag
      id={id}
      className={className}
      aria-label={label}
      initial={reduce ? false : "hidden"}
      {...trigger}
    >
      {lines.map((line, li) => (
        <span key={li} className={`block ${line.className ?? ""}`} aria-hidden="true">
          {line.text.split(" ").map((word, wi) => {
            const i = index++;
            return (
              <span key={wi}>
                <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                  <motion.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "110%", rotate: 4 },
                      show: {
                        y: "0%",
                        rotate: 0,
                        transition: { duration: 1, ease: EASE, delay: delay + i * stagger },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>{" "}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
