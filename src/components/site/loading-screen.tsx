"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium full-screen loading overlay shown on first mount.
 * Locks body scroll while visible, then fades out after ~1.6s.
 */
export function LoadingScreen() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const t = window.setTimeout(
      () => setVisible(false),
      prefersReduced ? 400 : 1600
    );
    return () => window.clearTimeout(t);
  }, []);

  // Lock body scroll while the loader is visible.
  React.useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loading-screen"
          role="status"
          aria-live="polite"
          aria-label="Loading Manashakti"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          {/* soft ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-calm-gradient opacity-70 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center gap-6 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <div className="animate-breathe">
                <Image
                  src="/brand/manashakti-logo.png"
                  alt=""
                  width={64}
                  height={64}
                  priority
                  className="h-16 w-16 rounded-2xl object-cover ring-1 ring-sage/30 shadow-soft"
                />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                Manashakti
              </span>
            </motion.div>

            {/* thin animated progress line */}
            <div
              aria-hidden
              className="relative h-px w-44 overflow-hidden rounded-full bg-muted"
            >
              <motion.div
                className="absolute inset-0 origin-left bg-gradient-to-r from-sage to-teal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-sm text-muted-foreground"
            >
              Preparing a calm space for you&hellip;
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
