"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { FadeUp } from "@/components/site/motion";
import { CalmBlobs } from "@/components/site/calm-blobs";
import { Icon } from "@/components/site/icon";
import { useBooking } from "@/components/site/booking-context";
import { clinic } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/** Inline WhatsApp glyph (Lucide has no brand icon). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-4 w-4", className)}
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02ZM12.04 20.15h-.003a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

const trustItems = [
  { label: "Confidential", icon: "Lock" as const },
  { label: "Evidence-based", icon: "ShieldCheck" as const },
  { label: "In-clinic & online", icon: "Video" as const },
];

export function Hero() {
  const { openBooking, openWhatsApp } = useBooking();

  return (
    <Section
      id="home"
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-calm-gradient pt-28 pb-20 sm:pt-32 sm:pb-24"
      containerClassName="relative z-10"
    >
      <CalmBlobs />

      {/* Abstract organic decorative SVG behind the right column */}
      <svg
        aria-hidden
        viewBox="0 0 600 600"
        className="pointer-events-none absolute -right-20 top-1/4 hidden h-[36rem] w-[36rem] -translate-y-1/2 text-teal/10 lg:block"
        fill="none"
      >
        <path
          d="M300 80c60-40 140-30 180 30s30 150-20 200-140 70-210 40-120-110-90-180 80-90 140-90Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <path
          d="M280 140c50-30 110-20 140 20s30 110-10 150-110 50-160 25-90-80-70-130 40-65 100-65Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M210 250c-12-30 6-70 40-80s70 14 78 46-16 70-50 80-66-8-68-46Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>

      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start text-left">
          <FadeUp>
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
              <Icon name="Leaf" className="h-3.5 w-3.5" aria-hidden />
              Compassionate Psychiatric Care
              <span className="mx-1 h-1 w-1 rounded-full bg-sage" aria-hidden />
              Margao, Goa
            </span>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.05] text-balance text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Helping You Find{" "}
              <span className="bg-gradient-to-br from-teal via-teal to-sage bg-clip-text text-transparent">
                Balance, Strength &amp; Peace
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground">
              {clinic.heroSubheading}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {clinic.heroSupporting}
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-12 rounded-full px-7 text-base shadow-soft"
                onClick={() => openBooking("new")}
              >
                <Icon name="CalendarPlus" className="h-5 w-5" aria-hidden />
                Book Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-sage/50 bg-background px-7 text-base text-foreground hover:border-teal hover:bg-sage/10 hover:text-teal"
                onClick={() => openWhatsApp()}
              >
                <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
                Chat on WhatsApp
              </Button>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {trustItems.map((item) => (
                <li key={item.label} className="inline-flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sage/25 text-teal">
                    <Icon name={item.icon} className="h-3 w-3" aria-hidden />
                  </span>
                  {item.label}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        {/* RIGHT COLUMN */}
        <FadeUp delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md sm:max-w-lg lg:max-w-none">
            {/* Decorative blob behind */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sage/45 via-teal/15 to-transparent blur-2xl animate-float-slow"
            />
            <div
              aria-hidden
              className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-sage/40 blur-3xl animate-float-slower"
            />

            {/* Photo frame */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/40 shadow-soft-lg ring-1 ring-sage/30">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/brand/dr-arpita-sirsikar.png`}
                alt="Dr. Arpita Sirsikar, Consultant Psychiatrist at Manashakti, Margao, Goa"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-top"
              />
              {/* subtle gradient veil at bottom for legibility of overlay card */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
              />
            </div>

            {/* Glass overlay card — bottom left */}
            <div className="glass absolute bottom-5 left-5 right-5 rounded-2xl p-4 shadow-soft sm:left-6 sm:right-auto sm:max-w-[18rem]">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Icon name="Stethoscope" className="h-5 w-5" aria-hidden />
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-lg font-semibold leading-tight text-foreground">
                    {clinic.doctorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {clinic.doctorTitle}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-sage/25 px-2.5 py-1 text-xs font-medium text-teal">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      aria-hidden
                    />
                    Open today · 9 AM – 6 PM
                  </div>
                </div>
              </div>
            </div>

            {/* Small floating accent badge — top right */}
            <div className="glass absolute -right-3 top-6 hidden rounded-2xl px-3 py-2 shadow-soft sm:flex sm:items-center sm:gap-2 animate-float-slow">
              <span className="text-lg">🌿</span>
              <span className="text-xs font-medium text-foreground">
                Calm, welcoming space
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}
