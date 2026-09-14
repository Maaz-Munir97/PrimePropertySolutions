"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import clsx from "clsx";
import { site } from "@/lib/content";

export default function OfficeMap() {
  const [active, setActive] = useState(0);
  const office = site.offices[active];

  return (
    <div className="overflow-hidden rounded-3xl border border-night/10 bg-paper">
      <div role="tablist" aria-label="Office locations" className="flex gap-1 p-2">
        {site.offices.map((o, i) => (
          <button
            key={o.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className="relative flex-1 rounded-2xl px-4 py-3 text-left"
          >
            {i === active && (
              <motion.span
                layoutId="office-tab"
                className="absolute inset-0 rounded-2xl bg-night"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span
              className={clsx(
                "relative block text-[0.65rem] font-semibold tracking-[0.18em] uppercase transition-colors",
                i === active ? "text-clay-soft" : "text-mute",
              )}
            >
              {o.name}
            </span>
            <span
              className={clsx("relative mt-1 block text-sm font-medium transition-colors", i === active ? "text-bone" : "text-night")}
            >
              {o.address}
            </span>
          </button>
        ))}
      </div>
      <div className="relative h-72 sm:h-80">
        <AnimatePresence mode="wait">
          <motion.iframe
            key={office.map}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            title={`Map of ${office.address}`}
            src={`https://www.google.com/maps?q=${office.map}&output=embed`}
            className="absolute inset-0 size-full grayscale-[35%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
