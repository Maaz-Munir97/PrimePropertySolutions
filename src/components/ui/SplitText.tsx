"use client";

import { motion } from "motion/react";
import clsx from "clsx";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /** Word indexes rendered in the italic clay accent. */
  accent?: number[];
  as?: "h1" | "h2" | "p";
  /** When set, animation is controlled by this flag instead of scrolling into view. */
  play?: boolean;
};

/** Reveals a heading word by word, each word sliding up from behind a mask. */
export default function SplitText({ text, className, delay = 0, accent = [], as = "h1", play }: SplitTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  const controlled = play !== undefined;

  return (
    <Tag
      className={className}
      initial="hidden"
      animate={controlled ? (play ? "show" : "hidden") : undefined}
      whileInView={controlled ? undefined : "show"}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} aria-hidden className="-mx-[0.06em] inline-block overflow-hidden px-[0.06em] pb-[0.1em] align-top">
          <motion.span
            className={clsx("inline-block", accent.includes(i) && "italic text-clay")}
            variants={{
              hidden: { y: "115%" },
              show: { y: "0%", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
