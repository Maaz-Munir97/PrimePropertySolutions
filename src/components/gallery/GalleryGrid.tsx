"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { gallery, type GalleryCategory, type GalleryItem } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;
const filters: ("All" | GalleryCategory)[] = ["All", "Residential", "Commercial & Strata"];

export default function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<number | null>(null);
  const visible = filter === "All" ? gallery : gallery.filter((item) => item.category === filter);

  useEffect(() => {
    if (active === null) return;
    const count = visible.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % count));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + count) % count));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, visible.length]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={clsx(
                "relative rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                filter === f ? "border-night text-bone" : "border-night/15 text-night/70 hover:text-night",
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="gallery-filter"
                  className="absolute inset-0 rounded-full bg-night"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-mute">
          <span className="font-semibold text-night">{visible.length}</span> projects
        </p>
      </div>

      <motion.ul
        layout
        className="mt-12 grid grid-flow-dense gap-4 sm:auto-rows-[15rem] sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((item, i) => (
            <motion.li
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease }}
              className={clsx(i % 5 === 0 && "sm:col-span-2 sm:row-span-2")}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Open photo: ${item.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl bg-sand sm:aspect-auto sm:h-full"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes={i % 5 === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100" />
                <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-left text-bone transition-all duration-500 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  <span>
                    <span className="block text-[0.65rem] font-semibold tracking-[0.2em] text-clay-soft uppercase">
                      {item.category}
                    </span>
                    <span className="mt-1 block font-display text-2xl leading-tight">{item.title}</span>
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-bone text-night">
                    <Plus className="size-4" aria-hidden />
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={visible} index={active} onChange={setActive} />
    </>
  );
}

function Lightbox({
  items,
  index,
  onChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}) {
  const item = index === null ? null : items[index];
  const step = (dir: number) => index !== null && onChange((index + dir + items.length) % items.length);
  const iconButton =
    "flex size-12 items-center justify-center rounded-full border border-bone/20 text-bone transition-colors hover:bg-bone hover:text-night";

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-night/95 p-4 backdrop-blur-sm sm:p-10"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => onChange(null)}
            className={clsx(iconButton, "absolute right-4 top-4 sm:right-8 sm:top-8")}
          >
            <X className="size-5" aria-hidden />
          </button>

          <AnimatePresence mode="wait">
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image src={item.src} alt={item.title} fill sizes="(min-width: 1024px) 56rem, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4 text-bone">
                <span>
                  <span className="block text-[0.65rem] font-semibold tracking-[0.2em] text-clay-soft uppercase">
                    {item.category}
                  </span>
                  <span className="mt-1 block font-display text-2xl sm:text-3xl">{item.title}</span>
                </span>
                <span className="text-sm text-bone/55">
                  {index + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-6 flex gap-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className={iconButton}>
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => step(1)} className={iconButton}>
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
