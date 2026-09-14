"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import SplitText from "@/components/ui/SplitText";
import RotatingBadge from "@/components/ui/RotatingBadge";
import { useIntroDone } from "@/components/providers/IntroProvider";
import { heroTrust } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ready = useIntroDone();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const ySmall = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const yBadge = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay, ease },
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-night pb-24 pt-32 text-bone sm:pt-40 lg:flex lg:min-h-svh lg:items-center lg:pb-28">
      <div aria-hidden className="bg-lines pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 size-[42rem] rounded-full bg-clay/15 blur-[160px]" />

      <div className="container-x relative grid items-center gap-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div>
          <motion.span {...fadeUp(0.1)} className="eyebrow text-clay-soft">
            Residential · Commercial · Strata · Insurance
          </motion.span>

          <SplitText
            as="h1"
            text="Your property, in expert hands."
            accent={[3, 4]}
            play={ready}
            delay={0.2}
            className="mt-7 font-display text-[3.5rem] leading-[0.95] sm:text-8xl xl:text-[7.25rem]"
          />

          <motion.p {...fadeUp(0.7)} className="mt-8 max-w-xl text-lg leading-relaxed text-bone/70">
            Painting, repairs and complete property solutions for homes, businesses and strata — backed by over 30
            years of experience and total transparency, from the first consultation to the final reveal.
          </motion.p>

          <motion.div {...fadeUp(0.85)} className="mt-10 flex flex-wrap gap-3">
            <Button href="/contact">Request a quote</Button>
            <Button href="/gallery" variant="ghost">
              View our work
            </Button>
          </motion.div>

          <motion.ul {...fadeUp(1)} className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-sm text-bone/60">
            {heroTrust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-clay" aria-hidden />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Image collage */}
        <div className="relative mx-auto w-full max-w-md pb-10 lg:max-w-none">
          <motion.div style={{ y: yMain }} className="relative ml-auto w-[82%]">
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 2rem)" }}
              animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 2rem)" } : undefined}
              transition={{ duration: 1.3, delay: 0.3, ease }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
            >
              <motion.div
                initial={{ scale: 1.35 }}
                animate={ready ? { scale: 1 } : undefined}
                transition={{ duration: 1.9, delay: 0.3, ease }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/gallery/g4.webp"
                  alt="Freshly finished two-storey home with pool"
                  fill
                  priority
                  sizes="(min-width: 1024px) 34vw, 80vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div style={{ y: ySmall }} className="absolute bottom-0 left-0 w-[46%]">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.2, delay: 0.75, ease }}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border-[6px] border-night"
            >
              <Image
                src="/images/gallery/g5.webp"
                alt="Bright living room after works"
                fill
                sizes="(min-width: 1024px) 18vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div style={{ y: yBadge }} className="absolute -top-8 left-[4%] sm:left-[8%]">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{ duration: 1.1, delay: 1.1, ease }}
            >
              <RotatingBadge />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
