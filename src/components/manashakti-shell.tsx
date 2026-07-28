"use client";

import * as React from "react";
import { BookingProvider } from "@/components/site/booking-context";
import { LoadingScreen } from "@/components/site/loading-screen";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { BackToTop } from "@/components/site/back-to-top";
import { FloatingActionBar } from "@/components/site/floating-action-bar";
import { AIAssistant } from "@/components/site/ai-assistant";
import { BookingModals } from "@/components/site/booking-modals";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { QuickStart } from "@/components/sections/quick-start";
import { Trust } from "@/components/sections/trust";
import { AboutDoctor } from "@/components/sections/about-doctor";
import { WhenToSeekHelp } from "@/components/sections/when-to-seek-help";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Reviews } from "@/components/sections/reviews";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { ClinicInfo } from "@/components/sections/clinic-info";
import { Privacy } from "@/components/sections/privacy";
import { Emergency } from "@/components/sections/emergency";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

/**
 * The complete Manashakti single-page experience.
 * Wrapped in BookingProvider so any section can trigger booking/WhatsApp modals.
 */
export function ManashaktiShell() {
  return (
    <BookingProvider>
      <LoadingScreen />
      <ScrollProgress />
      <div className="relative flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <QuickStart />
          <Trust />
          <AboutDoctor />
          <WhenToSeekHelp />
          <HowItWorks />
          <Reviews />
          <Testimonials />
          <FAQ />
          <ClinicInfo />
          <Privacy />
          <Emergency />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Floating / overlay UI */}
      <FloatingActionBar />
      <AIAssistant />
      <BackToTop />
      <BookingModals />
    </BookingProvider>
  );
}
