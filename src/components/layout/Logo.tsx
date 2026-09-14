import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Prime Property Solutions — home"
      className={clsx("group flex items-center gap-3 text-bone", className)}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={44}
        height={45}
        priority
        className="h-11 w-auto transition-transform duration-700 ease-luxe group-hover:-translate-y-0.5"
      />
      <span className="leading-none">
        <span className="block font-display text-[1.65rem] tracking-[0.14em]">PRIME</span>
        <span className="mt-1 block text-[0.56rem] font-medium tracking-[0.3em] text-bone/60 uppercase">
          Property Solutions
        </span>
      </span>
    </Link>
  );
}
