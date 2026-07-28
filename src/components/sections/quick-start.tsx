"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { useBooking } from "@/components/site/booking-context";
import { quickStartOptions } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

type Accent = "sage" | "teal";

const accentStyles: Record<
  Accent,
  {
    chip: string;
    dot: string;
    border: string;
    hoverBorder: string;
    hoverBg: string;
  }
> = {
  sage: {
    chip: "bg-sage/25 text-teal",
    dot: "bg-emerald-500",
    border: "border-border",
    hoverBorder: "hover:border-sage/60",
    hoverBg: "hover:bg-sage/10",
  },
  teal: {
    chip: "bg-teal/15 text-teal",
    dot: "bg-teal",
    border: "border-border",
    hoverBorder: "hover:border-teal/50",
    hoverBg: "hover:bg-teal/[0.06]",
  },
};

export function QuickStart() {
  const { openBooking } = useBooking();

  return (
    <Section id="quick-start" className="bg-background">
      <SectionHeading
        eyebrow="Quick Start"
        title="How can we help today?"
        description="Choose the option that fits — we'll guide you from there."
      />

      <Stagger
        stagger={0.08}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {quickStartOptions.map((option) => {
          const accent = accentStyles[option.accent as Accent];
          return (
            <StaggerItem key={option.key} className="h-full">
              <Card
                role="button"
                tabIndex={0}
                aria-label={`${option.title} — ${option.description}`}
                onClick={() => openBooking(option.bookingKind)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openBooking(option.bookingKind);
                  }
                }}
                className={cn(
                  "group h-full cursor-pointer gap-0 rounded-2xl border p-6 shadow-soft transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-soft-lg",
                  accent.border,
                  accent.hoverBorder,
                  accent.hoverBg,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                {/* Icon chip with accent dot */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
                      accent.chip
                    )}
                  >
                    <Icon
                      name={option.icon as IconName}
                      className="h-6 w-6"
                      aria-hidden
                    />
                  </span>
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", accent.dot)}
                    aria-hidden
                  />
                </div>

                <h3 className="mt-5 font-serif text-lg font-medium leading-snug text-foreground">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {option.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                  Continue
                  <Icon
                    name="ArrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
