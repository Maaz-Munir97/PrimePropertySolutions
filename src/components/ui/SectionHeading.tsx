import clsx from "clsx";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  /** Set for dark backgrounds. */
  light?: boolean;
  align?: "split" | "left";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  light = false,
  align = "split",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "grid gap-6",
        align === "split" && text && "lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20",
        className,
      )}
    >
      <Reveal>
        <span className={clsx("eyebrow", light ? "text-clay-soft" : "text-clay-deep")}>{eyebrow}</span>
        <h2
          className={clsx(
            "mt-6 max-w-4xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl",
            light ? "text-bone" : "text-night",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {text && (
        <Reveal delay={0.1}>
          <p className={clsx("max-w-md text-lg leading-relaxed", light ? "text-bone/65" : "text-mute")}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
