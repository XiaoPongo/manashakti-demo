"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/site/icon";

/**
 * Circular back-to-top button.
 * Appears (fade + scale) after scrolling down > 600px.
 * Pinned to bottom-LEFT to avoid overlapping the FloatingActionBar (bottom-right).
 */
export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.7, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-[110]"
        >
          <Button
            size="icon"
            variant="outline"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="h-12 w-12 rounded-full border-sage/40 glass text-teal shadow-soft hover:bg-sage/15 hover:text-teal"
          >
            <Icon name="ArrowUp" className="h-5 w-5" />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
