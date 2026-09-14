"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import { nav, site } from "@/lib/content";
import Logo from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    setHidden(latest > prev && latest > 500);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={clsx(
            "absolute inset-0 -z-10 border-b transition-all duration-500",
            scrolled || open ? "border-bone/10 bg-night/80 backdrop-blur-xl" : "border-transparent",
          )}
        />
        <div
          className={clsx(
            "container-x flex items-center justify-between gap-6 transition-[padding] duration-500",
            scrolled ? "py-3" : "py-5 sm:py-6",
          )}
        >
          <Logo />

          <nav
            aria-label="Main"
            className="hidden items-center gap-1 rounded-full border border-bone/10 bg-bone/[0.04] p-1.5 backdrop-blur lg:flex"
          >
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "relative rounded-full px-5 py-2 text-sm transition-colors duration-300",
                    active ? "text-night" : "text-bone/70 hover:text-bone",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-bone"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.quotesPhoneHref}
              className="hidden items-center gap-2 text-sm text-bone/70 transition-colors hover:text-clay-soft xl:flex"
            >
              <PhoneCall className="size-4" aria-hidden />
              {site.quotesPhone}
            </a>
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-night transition-colors duration-500 hover:bg-bone sm:inline-flex"
            >
              Get a quote
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex size-11 items-center justify-center rounded-full border border-bone/20 bg-night/30 backdrop-blur lg:hidden"
            >
              <span
                className={clsx(
                  "absolute h-px w-5 bg-bone transition-transform duration-500 ease-luxe",
                  open ? "rotate-45" : "-translate-y-[3px]",
                )}
              />
              <span
                className={clsx(
                  "absolute h-px w-5 bg-bone transition-transform duration-500 ease-luxe",
                  open ? "-rotate-45" : "translate-y-[3px]",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at 92% 3rem)" }}
            animate={{ clipPath: "circle(150% at 92% 3rem)" }}
            exit={{ clipPath: "circle(0% at 92% 3rem)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-night pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex items-center justify-between border-b border-bone/10 py-5 font-display text-5xl",
                      isActive(item.href) ? "text-clay" : "text-bone",
                    )}
                  >
                    {item.label}
                    <span className="font-sans text-xs text-bone/40">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease }}
              className="container-x mt-auto space-y-6 pt-12"
            >
              <Button href="/contact" className="w-full">
                Request a quote
              </Button>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <a href={site.quotesPhoneHref} className="text-bone">
                  <span className="block text-xs tracking-[0.18em] text-bone/45 uppercase">Quotes</span>
                  {site.quotesPhone}
                </a>
                <a href={site.officePhoneHref} className="text-bone">
                  <span className="block text-xs tracking-[0.18em] text-bone/45 uppercase">Office</span>
                  {site.officePhone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
