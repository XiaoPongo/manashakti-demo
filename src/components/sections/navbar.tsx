"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Icon } from "@/components/site/icon";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { AccessibilityPanel } from "@/components/site/accessibility-panel";
import { useBooking } from "@/components/site/booking-context";
import { navLinks } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/**
 * Sticky top navbar.
 * Transparent at the very top, becomes glass + shadow after scrolling > 20px.
 * Desktop (lg+): logo left, centered nav links, controls + CTA right.
 * Mobile (< lg): logo left, theme toggle + hamburger right; Sheet for full menu.
 */
export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { openWhatsApp } = useBooking();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] transition-all duration-300",
        scrolled ? "glass shadow-soft" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8 md:h-20">
        {/* Left: Logo — big & bold, image only */}
        <Link
          href="#home"
          aria-label="Manashakti — back to top"
          className="flex shrink-0 items-center"
        >
          <Logo priority showWordmark={false} imgSize={44} className="md:scale-110 md:origin-left" />
        </Link>

        {/* Center: desktop nav links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Button
                asChild
                variant="ghost"
                className="h-10 rounded-full px-3.5 text-sm font-medium text-foreground hover:bg-sage/15 hover:text-teal"
              >
                <Link href={l.href}>{l.label}</Link>
              </Button>
            </li>
          ))}
        </ul>

        {/* Right cluster: desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <ThemeToggle />
          <AccessibilityPanel />
          <Button
            onClick={() => openWhatsApp()}
            className="ml-1 h-10 gap-2 rounded-full bg-teal px-5 text-sm font-semibold text-teal-foreground shadow-soft hover:bg-teal/90"
          >
            <Icon name="MessageCircle" className="h-4 w-4" aria-hidden />
            Book on WhatsApp
          </Button>
        </div>

        {/* Right cluster: mobile */}
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="h-11 w-11 rounded-full text-foreground hover:bg-sage/15 hover:text-teal"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-center"
                    >
                      <Icon name="X" className="h-5 w-5" aria-hidden />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex items-center justify-center"
                    >
                      <Icon name="Menu" className="h-5 w-5" aria-hidden />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="gap-0 p-0 sm:max-w-sm"
            >
              {/* Logo header */}
              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="sr-only">
                  Manashakti navigation menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to different sections of the Manashakti clinic website.
                </SheetDescription>
                <Logo />
              </SheetHeader>

              {/* Nav links */}
              <div className="scroll-elegant flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <Link
                          href={l.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-sage/15 hover:text-teal"
                        >
                          {l.label}
                          <Icon
                            name="ChevronRight"
                            className="h-4 w-4 text-muted-foreground"
                            aria-hidden
                          />
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer actions */}
              <div className="space-y-3 border-t border-border p-4">
                <Button
                  onClick={() => {
                    setMobileOpen(false);
                    openWhatsApp();
                  }}
                  className="h-12 w-full gap-2 rounded-2xl bg-teal text-teal-foreground shadow-soft hover:bg-teal/90"
                >
                  <Icon name="MessageCircle" className="h-4 w-4" aria-hidden />
                  Book on WhatsApp
                </Button>
                <div className="flex items-center justify-start gap-2 pt-1">
                  <AccessibilityPanel />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
