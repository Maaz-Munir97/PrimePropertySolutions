"use client";

import Image from "next/image";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Logo intro. `onFinish` fires when the underline finishes drawing, which lifts the curtain.
 * The `preloader-failsafe` CSS animation hides it anyway if JavaScript never runs.
 */
export default function Preloader({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div
      aria-hidden
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="preloader-failsafe fixed inset-0 z-[100] flex items-center justify-center bg-night"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ clipPath: "inset(100% 0% 0% 0%)", y: 20 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
          transition={{ duration: 1.1, ease }}
        >
          <Image src="/images/logo-mark.png" alt="" width={112} height={116} priority className="h-28 w-auto" />
        </motion.div>
        <div className="mt-5 overflow-hidden">
          <motion.p
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.45, ease }}
            className="pl-[0.35em] font-display text-4xl tracking-[0.35em] text-bone"
          >
            PRIME
          </motion.p>
        </div>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.55, ease }}
          onAnimationComplete={onFinish}
          className="mt-4 block h-px w-44 origin-left bg-clay"
        />
      </div>
    </motion.div>
  );
}
