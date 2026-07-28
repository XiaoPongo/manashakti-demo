"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { useBooking } from "@/components/site/booking-context";
import { cn } from "@/lib/utils";

type BookingOption = {
  key: string;
  title: string;
  description: string;
  icon: IconName;
  accent: "teal" | "sage";
  kind: "new" | "followup" | "online" | "enquiry";
};

const bookingOptions: BookingOption[] = [
  {
    key: "new",
    title: "Book New Appointment",
    description: "Begin your journey with a warm first conversation.",
    icon: "CalendarPlus",
    accent: "teal",
    kind: "new",
  },
  {
    key: "followup",
    title: "Follow-up Appointment",
    description: "Already a patient? Continue your care with ease.",
    icon: "CalendarClock",
    accent: "sage",
    kind: "followup",
  },
  {
    key: "online",
    title: "Online Consultation",
    description: "Confidential care from the comfort of home.",
    icon: "Video",
    accent: "teal",
    kind: "online",
  },
  {
    key: "enquiry",
    title: "General Enquiry",
    description: "Have a question? Reach out — we're happy to help.",
    icon: "MessageCircleQuestion",
    accent: "sage",
    kind: "enquiry",
  },
];

const accentStyles = {
  teal: {
    chip: "bg-teal/12 text-teal",
    border: "border-border",
    hoverBorder: "hover:border-teal/50",
    hoverBg: "hover:bg-teal/[0.04]",
    ring: "focus-visible:ring-teal/40",
  },
  sage: {
    chip: "bg-sage/25 text-teal",
    border: "border-border",
    hoverBorder: "hover:border-sage/60",
    hoverBg: "hover:bg-sage/10",
    ring: "focus-visible:ring-sage/50",
  },
} as const;

export function Booking() {
  const { openBooking } = useBooking();

  return (
    <Section id="booking" className="bg-muted/30">
      <SectionHeading
        eyebrow="Booking"
        title="How would you like to proceed?"
        description="Whatever brings you here, there's a gentle way forward."
      />

      <Stagger
        stagger={0.08}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:mt-14"
      >
        {bookingOptions.map((option) => {
          const accent = accentStyles[option.accent];
          return (
            <StaggerItem key={option.key} className="h-full">
              <button
                type="button"
                onClick={() => openBooking(option.kind)}
                aria-label={`${option.title} — ${option.description}`}
                className={cn(
                  "group flex h-full w-full flex-col items-start rounded-3xl border bg-card p-6 text-left shadow-soft",
                  "transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-soft-lg",
                  accent.border,
                  accent.hoverBorder,
                  accent.hoverBg,
                  "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  accent.ring
                )}
              >
                {/* Large icon chip */}
                <span
                  className={cn(
                    "inline-flex h-16 w-16 items-center justify-center rounded-2xl",
                    accent.chip
                  )}
                >
                  <Icon
                    name={option.icon}
                    className="h-8 w-8"
                    aria-hidden
                  />
                </span>

                <h3 className="mt-6 font-serif text-xl font-medium leading-snug text-foreground">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {option.description}
                </p>

                <span
                  className={cn(
                    "mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal"
                  )}
                >
                  Continue
                  <Icon
                    name="ArrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>

      <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
        Prefer to talk first? Call us at{" "}
        <a
          href="tel:+919511725382"
          className="font-medium text-teal underline-offset-4 hover:underline"
        >
          +91 95117 25382
        </a>{" "}
        — we&apos;re happy to guide you.
      </p>
    </Section>
  );
}
