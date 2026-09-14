"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import SplitText from "./SplitText";
import { useIntroDone } from "@/components/providers/IntroProvider";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent?: number[];
  text: string;
  image?: string;
  imageAlt?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark banner used at the top of every inner page. */
export default function PageHero({ eyebrow, title, accent, text, image, imageAlt = "" }: PageHeroProps) {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-night pb-20 pt-36 text-bone sm:pb-28 sm:pt-44">
      <div aria-hidden className="bg-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-clay/20 blur-[140px]" />

      <div className={clsx("container-x relative grid items-end gap-12", image && "lg:grid-cols-[1.3fr_0.7fr] lg:gap-20")}>
        <div>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={ready ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.8, ease }}
            className="eyebrow text-clay-soft"
          >
            {eyebrow}
          </motion.span>
          <SplitText
            text={title}
            accent={accent}
            play={ready}
            delay={0.1}
            className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-bone/65"
          >
            {text}
          </motion.p>
        </div>

        {image && (
          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
            animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" } : undefined}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]"
          >
            <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
