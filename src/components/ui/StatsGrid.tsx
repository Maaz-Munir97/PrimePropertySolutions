import clsx from "clsx";
import Counter from "./Counter";
import Reveal from "./Reveal";
import { stats } from "@/lib/content";

export default function StatsGrid({ className }: { className?: string }) {
  return (
    <dl className={clsx("grid gap-px overflow-hidden rounded-3xl border border-night/10 bg-night/10", className)}>
      {stats.map((stat, i) => (
        <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse justify-end bg-paper p-6 sm:p-8">
          <dt className="mt-3 text-sm leading-snug text-mute">{stat.label}</dt>
          <dd className="font-display text-6xl leading-none text-night sm:text-7xl">
            <Counter value={stat.value} suffix={stat.suffix} />
          </dd>
        </Reveal>
      ))}
    </dl>
  );
}
