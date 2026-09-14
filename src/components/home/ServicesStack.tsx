"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";

type Service = (typeof services)[number];

const tones = [
  { card: "border-bone/10 bg-coal text-bone", muted: "text-bone/65", check: "bg-clay text-night", link: "text-clay-soft" },
  { card: "border-night/10 bg-bone text-night", muted: "text-mute", check: "bg-night text-bone", link: "text-clay-deep" },
  { card: "border-night/10 bg-clay text-night", muted: "text-night/75", check: "bg-night text-clay", link: "text-night" },
];

/** Service cards that pin and stack on top of each other while scrolling (desktop). */
export default function ServicesStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="relative bg-night pb-24 pt-24 text-bone sm:pt-32 lg:pb-32">
      <div className="container-x">
        <SectionHeading
          light
          eyebrow="How we can help you"
          title={
            <>
              Three specialties. <em className="text-clay">One trusted team.</em>
            </>
          }
          text="Whether it's your home, your business or a strata complex, we simplify your project and keep you informed at every step."
        />

        <div ref={ref} className="mt-16 space-y-6 lg:mt-20 lg:space-y-0">
          {services.map((service, i) => (
            <StackCard key={service.slug} service={service} index={i} total={services.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({
  service,
  index,
  total,
  progress,
}: {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.05]);
  const tone = tones[index % tones.length];

  return (
    <div className="lg:sticky lg:flex lg:h-[calc(100svh-6rem)] lg:items-start" style={{ top: `${96 + index * 28}px` }}>
      <motion.article
        style={{ scale }}
        className={clsx(
          "grid w-full origin-top overflow-hidden rounded-[2rem] border lg:h-[min(40rem,calc(100svh-10rem))] lg:grid-cols-[1.05fr_0.95fr]",
          tone.card,
        )}
      >
        <div className="flex flex-col p-7 sm:p-12 lg:p-14">
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-3xl italic">{service.number}</span>
            <span className={clsx("text-xs font-semibold tracking-[0.2em] uppercase", tone.muted)}>{service.tagline}</span>
          </div>
          <h3 className="mt-10 font-display text-5xl leading-none sm:text-6xl lg:mt-auto">{service.title}</h3>
          <p className={clsx("mt-6 max-w-xl leading-relaxed", tone.muted)}>{service.description}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm">
                <span className={clsx("flex size-5 shrink-0 items-center justify-center rounded-full", tone.check)}>
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <Link
            href={`/services#${service.slug}`}
            className={clsx("group mt-10 inline-flex items-center gap-2 self-start text-sm font-semibold", tone.link)}
          >
            Learn more
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
          </Link>
        </div>

        <div className="group relative min-h-72 overflow-hidden sm:min-h-96 lg:min-h-0">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover transition-transform duration-[1.6s] ease-luxe group-hover:scale-105"
          />
        </div>
      </motion.article>
    </div>
  );
}
