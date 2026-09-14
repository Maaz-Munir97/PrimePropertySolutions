"use client";

import Image from "next/image";
import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import clsx from "clsx";

type BeforeAfterProps = {
  before: string;
  after: string;
  label: string;
  className?: string;
  sizes?: string;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** Drag (or use arrow keys) to wipe between the before and after photos. */
export default function BeforeAfter({
  before,
  after,
  label,
  className,
  sizes = "(min-width: 768px) 33vw, 100vw",
}: BeforeAfterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);
  const [touched, setTouched] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // A one-off peek animation hints that the image is interactive.
  useEffect(() => {
    if (!inView || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(50, [50, 20, 80, 50], {
      duration: 2.6,
      delay: 0.3,
      ease: "easeInOut",
      onUpdate: setPos,
    });
    return () => controls.stop();
  }, [inView, touched]);

  const moveTo = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      className={clsx(
        "relative aspect-[3/4] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl bg-sand",
        className,
      )}
    >
      <Image
        src={after}
        alt={`${label} — after`}
        fill
        sizes={sizes}
        draggable={false}
        className="pointer-events-none object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt={`${label} — before`}
          fill
          sizes={sizes}
          draggable={false}
          className="pointer-events-none object-cover"
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-night/70 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] text-bone uppercase backdrop-blur">
        Before
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-bone/90 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] text-night uppercase backdrop-blur">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-bone shadow-[0_0_24px_rgba(0,0,0,0.4)]"
        style={{ left: `${pos}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={`Compare ${label} before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={(e) => {
          if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
          e.preventDefault();
          setTouched(true);
          setPos((p) => clamp(p + (e.key === "ArrowLeft" ? -5 : 5)));
        }}
        className="absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-night shadow-xl ring-4 ring-bone/30"
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight className="size-5" aria-hidden />
      </div>
    </div>
  );
}
