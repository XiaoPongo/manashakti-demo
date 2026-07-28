"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem, FadeUp } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";
import { cn } from "@/lib/utils";

const placeholderTestimonials = [
  {
    text: "A verified patient story will appear here.",
    attribution: "— Patient, Margao",
  },
  {
    text: "A verified patient story will appear here.",
    attribution: "— Patient, South Goa",
  },
  {
    text: "A verified patient story will appear here.",
    attribution: "— Patient, Margao",
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-background">
      <SectionHeading
        eyebrow="Testimonials"
        title="Stories of hope and healing"
        description="These spaces will feature anonymized patient stories, shared with consent."
      />

      <Stagger
        stagger={0.1}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14"
      >
        {placeholderTestimonials.map((t, idx) => (
          <StaggerItem key={idx} className="h-full">
            <figure
              className={cn(
                "glass flex h-full flex-col justify-between rounded-3xl p-8 shadow-soft",
                "min-h-[14rem]"
              )}
            >
              <Icon
                name="Quote"
                className="h-9 w-9 text-sage/70"
                aria-hidden
              />
              <blockquote className="mt-5 font-serif text-lg font-medium leading-snug text-foreground sm:text-xl">
                <em className="italic text-muted-foreground">{t.text}</em>
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-teal">
                {t.attribution}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeUp className="mt-10" delay={0.05}>
        <p className="mx-auto flex max-w-xl items-center justify-center gap-2 text-center text-xs leading-relaxed text-muted-foreground">
          <Icon
            name="Lock"
            className="h-3.5 w-3.5 shrink-0 text-sage"
            aria-hidden
          />
          I never publish testimonials without explicit written consent.
        </p>
      </FadeUp>
    </Section>
  );
}
