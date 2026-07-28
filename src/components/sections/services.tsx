"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem, FadeUp } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { useBooking } from "@/components/site/booking-context";
import { services } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/** Alternating tinted chip so the grid feels organic, not flat. */
const chipTints = [
  "bg-teal/12 text-teal",
  "bg-sage/25 text-teal",
  "bg-amber-soft/40 text-teal",
];

export function Services() {
  const { openBooking, openWhatsApp } = useBooking();

  return (
    <Section id="services" className="bg-background">
      <SectionHeading
        eyebrow="Our Services"
        title="Comprehensive psychiatric care"
        description="From everyday struggles to complex conditions — compassionate, evidence-based support across every stage of life."
      />

      <Stagger
        stagger={0.07}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14"
      >
        {services.map((service, idx) => {
          const tint = chipTints[idx % chipTints.length];
          return (
            <StaggerItem key={service.title} className="h-full">
              <article
                className={cn(
                  "group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft",
                  "transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-soft-lg hover:border-sage/50"
                )}
              >
                {/* Icon chip */}
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                    tint
                  )}
                >
                  <Icon
                    name={service.icon as IconName}
                    className="h-7 w-7"
                    aria-hidden
                  />
                </span>

                {/* Title + description */}
                <h3 className="mt-5 font-serif text-xl font-medium leading-snug text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* Footer link */}
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className={cn(
                    "mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-teal",
                    "rounded-md outline-none transition-all",
                    "focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "hover:gap-2.5"
                  )}
                  aria-label={`Learn more about ${service.title} on WhatsApp`}
                >
                  Learn More
                  <Icon
                    name="ArrowRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </button>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Centered CTA */}
      <FadeUp className="mt-14 sm:mt-16" delay={0.05}>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border border-sage/30 bg-sage/10 p-8 text-center shadow-soft sm:p-10">
          <p className="font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl">
            Not sure which service fits? Let&apos;s figure it out together.
          </p>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            A short conversation is often all it takes to find the right place
            to begin. We&apos;ll meet you wherever you are.
          </p>
          <Button
            size="lg"
            className="h-12 rounded-full px-7 text-base shadow-soft"
            onClick={() => openBooking("new")}
          >
            <Icon name="CalendarPlus" className="h-5 w-5" aria-hidden />
            Book Appointment
          </Button>
        </div>
      </FadeUp>
    </Section>
  );
}
