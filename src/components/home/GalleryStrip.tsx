"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { gallery } from "@/lib/content";

/** A horizontally draggable strip of project photos with a custom "Drag" cursor. */
export default function GalleryStrip() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(0);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const x = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const y = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const measure = () => {
      const style = getComputedStyle(wrap);
      const inner = wrap.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setLimit(Math.max(0, track.scrollWidth - inner));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="overflow-hidden bg-bone py-24 sm:py-32">
      <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          align="left"
          eyebrow="Our work"
          title={
            <>
              Take a look at <em className="text-clay-deep">some of our projects.</em>
            </>
          }
        />
        <Reveal className="shrink-0">
          <Button href="/gallery" variant="ghost-dark">
            View full gallery
          </Button>
        </Reveal>
      </div>

      <div
        ref={wrapRef}
        className="container-x relative mt-14"
        onPointerMove={(e) => {
          const rect = wrapRef.current?.getBoundingClientRect();
          if (!rect) return;
          cursorX.set(e.clientX - rect.left);
          cursorY.set(e.clientY - rect.top);
        }}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          dragConstraints={{ left: -limit, right: 0 }}
          dragElastic={0.08}
          className="flex w-max cursor-grab items-start gap-5 active:cursor-grabbing sm:cursor-none"
        >
          {gallery.map((item, i) => (
            <figure
              key={item.src}
              className={clsx(
                "group relative shrink-0 overflow-hidden rounded-3xl bg-sand",
                i % 2 ? "mt-12 aspect-[4/3] w-[80vw] sm:w-[28rem]" : "aspect-[4/5] w-[68vw] sm:w-[22rem]",
              )}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                draggable={false}
                sizes="(min-width: 640px) 28rem, 80vw"
                className="pointer-events-none object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-2xl bg-night/65 px-4 py-3 text-sm text-bone backdrop-blur-md">
                <span className="truncate">{item.title}</span>
                <span className="shrink-0 text-xs text-bone/60">{item.category}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>

        <motion.div
          aria-hidden
          style={{ x, y }}
          animate={{ scale: hovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute left-0 top-0 z-10 -ml-11 -mt-11 hidden size-22 items-center justify-center rounded-full bg-clay text-xs font-semibold tracking-[0.2em] text-night uppercase sm:flex"
        >
          Drag
        </motion.div>
      </div>
    </section>
  );
}
