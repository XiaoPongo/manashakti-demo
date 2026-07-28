"use client";

import * as React from "react";
import { motion, useInView, type Variants } from "framer-motion";

/** Whether the user prefers reduced motion (client only). */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof motion;
  once?: boolean;
  amount?: number;
}

/** Fade-up on scroll into view. */
export function FadeUp({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: FadeUpProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: FadeInProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
}

/** Container that staggers its direct <StaggerItem> children. */
export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  once = true,
  amount = 0.2,
}: StaggerProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={baseVariants}>
      {children}
    </motion.div>
  );
}

/** Soft parallax on scroll. */
export function Parallax({
  children,
  className,
  offset = 40,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    if (reduced) return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // progress from -1 (below) to 1 (above)
      const progress = (windowHeight / 2 - (rect.top + rect.height / 2)) / windowHeight;
      setY(progress * offset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset, reduced]);

  return (
    <div ref={ref} className={className} style={{ transform: `translateY(${y}px)` }}>
      {children}
    </div>
  );
}

export { baseVariants };
