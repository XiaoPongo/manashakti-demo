"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { whenToSeekHelp } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

export function WhenToSeekHelp() {
  return (
    <Section id="when-to-seek-help" className="relative overflow-hidden bg-muted/30">
      <SectionHeading
        eyebrow="When to Seek Help"
        title="Recognizing when to reach out"
        description="There's no threshold you have to meet. If something feels hard, that's reason enough."
      />

      <Stagger
        stagger={0.07}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {whenToSeekHelp.map((item) => {
          const iconName = item.icon as IconName;
          return (
            <StaggerItem key={item.title} className="h-full">
              <article
                className={cn(
                  "group flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300",
                  "hover:-translate-y-1 hover:border-sage/50 hover:shadow-soft-lg"
                )}
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sage/25 to-teal/15 text-teal transition-transform duration-300 group-hover:scale-105">
                  <Icon name={iconName} className="h-6 w-6" aria-hidden />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-lg font-medium leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Callout strip */}
      <FadeUp delay={0.1}>
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-teal/20 bg-gradient-to-r from-teal/10 via-sage/10 to-transparent p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal/15 text-teal">
            <Icon name="Sparkles" className="h-7 w-7" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl">
              Seeking help early often leads to better outcomes.
            </p>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have to wait for things to feel unbearable — reaching out
              now is a quiet act of care for yourself.
            </p>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
