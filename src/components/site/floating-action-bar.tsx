"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Icon, type IconName } from "@/components/site/icon";
import { useBooking } from "@/components/site/booking-context";
import { contact } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

type FabAction = {
  id: string;
  label: string;
  icon: IconName;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.92,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

/**
 * Expandable floating action menu, fixed bottom-right.
 * Collapsed: single teal FAB with a Plus that rotates 45° into an X.
 * Expanded: reveals 4 stacked labeled action pills above the FAB.
 */
export function FloatingActionBar() {
  const [open, setOpen] = React.useState(false);
  const { openWhatsApp, openBooking } = useBooking();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const actions: FabAction[] = React.useMemo(
    () => [
      {
        id: "call",
        label: "Call",
        icon: "Phone",
        href: `tel:${contact.phoneDial}`,
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        icon: "MessageCircle",
        onClick: () => openWhatsApp(),
      },
      {
        id: "book",
        label: "Book Appointment",
        icon: "CalendarPlus",
        onClick: () => openBooking("new"),
      },
      {
        id: "directions",
        label: "Directions",
        icon: "Navigation",
        href: contact.mapsDirections,
        external: true,
      },
    ],
    [openWhatsApp, openBooking]
  );

  // Close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click / touch.
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-[110] flex flex-col items-end gap-3"
    >
      <AnimatePresence mode="popLayout">
        {open ? (
          <motion.div
            key="actions"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-end gap-2.5"
          >
            {actions.map((a) => {
              const inner = (
                <>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-teal-foreground">
                    <Icon name={a.icon} className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="pr-1 text-sm font-medium text-foreground">
                    {a.label}
                  </span>
                </>
              );
              const cls = cn(
                "group flex items-center gap-2.5 rounded-full py-2.5 pl-3 pr-4",
                "glass border border-sage/30 shadow-soft",
                "transition-transform hover:scale-[1.02] hover:shadow-soft-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
              );
              return a.href ? (
                <motion.a
                  key={a.id}
                  href={a.href}
                  target={a.external ? "_blank" : undefined}
                  rel={a.external ? "noopener noreferrer" : undefined}
                  aria-label={a.label}
                  variants={itemVariants}
                  onClick={() => setOpen(false)}
                  className={cls}
                >
                  {inner}
                </motion.a>
              ) : (
                <motion.button
                  key={a.id}
                  type="button"
                  aria-label={a.label}
                  variants={itemVariants}
                  onClick={() => {
                    setOpen(false);
                    a.onClick?.();
                  }}
                  className={cls}
                >
                  {inner}
                </motion.button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close quick actions" : "Open quick actions"}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-teal text-teal-foreground shadow-soft-lg transition-colors hover:bg-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <Icon name="Plus" className="h-6 w-6" aria-hidden />
        </motion.span>
      </motion.button>
    </div>
  );
}
