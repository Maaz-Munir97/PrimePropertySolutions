"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  as?: "div" | "li";
};

/** Fades and lifts its children into view once, when scrolled into the viewport. */
export default function Reveal({ delay = 0, y = 32, as = "div", children, ...rest }: RevealProps) {
  const Tag = (as === "li" ? motion.li : motion.div) as typeof motion.div;

  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
