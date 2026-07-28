"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, Stagger, StaggerItem, usePrefersReducedMotion } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { howItWorks } from "@/lib/clinic-data";

export function HowItWorks() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="how-it-works" className="relative overflow-hidden bg-background">
      <SectionHeading
        eyebrow="How It Works"
        title="Your journey, gently guided"
        description="A clear, calming path from first reach-out to steady follow-up."
      />

      {/* ===== Desktop / tablet: horizontal timeline ===== */}
      <div className="mt-16 hidden md:block">
        <div className="relative">
          {/* Horizontal connecting line (gradient sage → teal) */}
          <div className="absolute left-0 right-0 top-7 h-0.5 overflow-hidden bg-muted">
            {!reduced ? (
              <motion.div
                className="h-full origin-left bg-gradient-to-r from-sage via-teal to-teal"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-r from-sage via-teal to-teal" />
            )}
          </div>

          <Stagger
            stagger={0.14}
            amount={0.3}
            className="grid grid-cols-5 gap-4"
          >
            {howItWorks.map((step) => {
              const iconName = step.icon as IconName;
              return (
                <StaggerItem key={step.step} className="flex flex-col items-center">
                  {/* Numbered node circle */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal/30 bg-background text-teal shadow-soft">
                    <Icon name={iconName} className="h-6 w-6" aria-hidden />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[0.7rem] font-bold text-teal-foreground shadow-soft">
                      {step.step}
                    </span>
                  </div>

                  {/* Step card */}
                  <article className="mt-6 flex w-full flex-col gap-2 rounded-2xl border border-border bg-card p-5 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                    <h3 className="font-serif text-base font-medium leading-snug text-foreground sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {step.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      {/* ===== Mobile: vertical timeline ===== */}
      <div className="mt-12 md:hidden">
        <div className="relative pl-12">
          {/* Vertical line */}
          <div className="absolute left-[1.4rem] top-2 bottom-2 w-0.5 overflow-hidden bg-muted">
            {!reduced ? (
              <motion.div
                className="h-full origin-top bg-gradient-to-b from-sage via-teal to-teal"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-b from-sage via-teal to-teal" />
            )}
          </div>

          <Stagger
            stagger={0.1}
            amount={0.2}
            className="flex flex-col gap-5"
          >
            {howItWorks.map((step) => {
              const iconName = step.icon as IconName;
              return (
                <StaggerItem key={step.step} className="relative">
                  {/* Node */}
                  <div className="absolute -left-12 top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-teal/30 bg-background text-teal shadow-soft">
                    <Icon name={iconName} className="h-5 w-5" aria-hidden />
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[0.6rem] font-bold text-teal-foreground">
                      {step.step}
                    </span>
                  </div>

                  <article className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h3 className="font-serif text-base font-medium leading-snug text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>

      {/* Closing reassurance */}
      <FadeUp delay={0.1}>
        <p className="mx-auto mt-14 max-w-xl text-center text-sm text-muted-foreground">
          Every step moves at your pace — there&apos;s no rush, no pressure, only
          steady, supportive guidance.
        </p>
      </FadeUp>
    </Section>
  );
}
