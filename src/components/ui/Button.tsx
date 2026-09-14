import Link from "next/link";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "clay" | "dark" | "ghost" | "ghost-dark";
  className?: string;
  icon?: boolean;
};

// Each variant has a colour that "fills up" from the bottom on hover.
const variants = {
  clay: "bg-clay text-night after:bg-bone",
  dark: "bg-night text-bone after:bg-clay hover:text-night",
  ghost: "border border-bone/25 text-bone after:bg-bone hover:text-night",
  "ghost-dark": "border border-night/20 text-night after:bg-night hover:text-bone",
};

export default function Button({ href, children, variant = "clay", className, icon = true }: ButtonProps) {
  const external = href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = clsx(
    "group relative isolate inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold tracking-wide transition-colors duration-500",
    "after:absolute after:inset-0 after:-z-10 after:translate-y-full after:rounded-full after:transition-transform after:duration-500 after:ease-luxe hover:after:translate-y-0",
    variants[variant],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight className="size-4 transition-transform duration-500 ease-luxe group-hover:rotate-45" aria-hidden />
      )}
    </>
  );

  return external ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
