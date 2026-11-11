import clsx from "clsx";
import { sectors } from "@/lib/content";

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      <path d="M12 0c.8 6.6 5.4 11.2 12 12-6.6.8-11.2 5.4-12 12-.8-6.6-5.4-11.2-12-12C6.6 11.2 11.2 6.6 12 0Z" fill="currentColor" />
    </svg>
  );
}

function Band({ className, reverse }: { className: string; reverse?: boolean }) {
  const items = [...sectors, ...sectors];
  return (
    <div className={clsx("absolute left-[-5%] top-1/2 flex w-[110%] overflow-hidden py-5", className)}>
      <div className={clsx("flex w-max shrink-0 items-center", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {items.map((sector, i) => (
          <span key={i} aria-hidden={i >= sectors.length} className="flex items-center font-display text-3xl sm:text-4xl">
            <span className="px-8 whitespace-nowrap">{sector}</span>
            <Star />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two crossing ribbons of the sectors MaxOne works in. */
export default function SectorMarquee() {
  return (
    <section aria-label="Sectors we work in" className="relative h-52 overflow-hidden bg-bone sm:h-64">
      <Band reverse className="-translate-y-1/2 rotate-2 bg-night text-bone" />
      <Band className="z-10 -translate-y-1/2 -rotate-2 bg-clay text-night shadow-[0_20px_50px_-20px_rgba(12,13,15,0.5)]" />
    </section>
  );
}
