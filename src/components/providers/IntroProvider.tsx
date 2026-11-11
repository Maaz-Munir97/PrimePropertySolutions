"use client";

import { AnimatePresence } from "motion/react";
import { createContext, useContext, useEffect, useState } from "react";
import Preloader from "@/components/layout/Preloader";

const IntroContext = createContext(true);

/** True once the intro curtain has started lifting (or was skipped). */
export const useIntroDone = () => useContext(IntroContext);

/**
 * Plays the logo intro once per browser session, then lets page
 * entrance animations run as the curtain lifts.
 */
export default function IntroProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"pending" | "play" | "skip">("pending");
  const [showCurtain, setShowCurtain] = useState(true);
  const [done, setDone] = useState(false);

  const finish = () => {
    setShowCurtain(false);
    setDone(true);
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("maxone-intro") === "1";
      sessionStorage.setItem("maxone-intro", "1");
    } catch {}

    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("skip");
      setDone(true);
      return;
    }

    setMode("play");
    // The intro normally finishes via the preloader's animation callback;
    // this timer is only a backup so content can never stay hidden.
    const timer = setTimeout(finish, 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IntroContext.Provider value={done}>
      {mode !== "skip" && (
        <AnimatePresence>{showCurtain && <Preloader key="preloader" onFinish={finish} />}</AnimatePresence>
      )}
      {children}
    </IntroContext.Provider>
  );
}
