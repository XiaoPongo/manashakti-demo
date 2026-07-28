"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed top scroll-progress bar (h-1, full width).
 * Tracks window scroll, scales a sage→teal gradient from the left.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[120] h-1 w-full origin-left bg-gradient-to-r from-sage to-teal"
    />
  );
}
