"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import type { TeamMember } from "@/lib/content";

export default function TeamPortrait({ member, className }: { member: TeamMember; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(10% 10% 10% 10% round 2rem)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 2rem)", opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      className={clsx("relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-sand", className)}
    >
      <motion.div style={{ y, scale: 1.16 }} className="absolute inset-0">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-cover object-top"
        />
      </motion.div>
      <span className="absolute bottom-5 left-5 rounded-full bg-night/70 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-bone uppercase backdrop-blur">
        {member.firstName}
      </span>
    </motion.div>
  );
}
