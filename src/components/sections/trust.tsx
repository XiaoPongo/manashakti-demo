"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { CalmBlobs } from "@/components/site/calm-blobs";

interface TrustItem {
  icon: IconName;
  title: string;
  description: string;
}

const trustItems: TrustItem[] = [
  {
    icon: "Lock",
    title: "Confidential Consultations",
    description:
      "Every conversation is held in strict confidence, following medical privacy guidelines so you can speak openly and without hesitation.",
  },
  {
    icon: "ShieldCheck",
    title: "Evidence-Based Treatment",
    description:
      "Your care is grounded in scientifically validated practice — current research, considered judgement and clinically proven methods.",
  },
  {
    icon: "HeartHandshake",
    title: "Compassionate Psychiatric Care",
    description:
      "Warmth, patience and zero judgement. You'll be met as a person first — heard, respected and supported at every step.",
  },
];

export function Trust() {
  return (
    <Section
      id="trust"
      className="relative overflow-hidden bg-beige/60 dark:bg-muted/30"
    >
      <CalmBlobs variant="sage" />

      <Stagger
        stagger={0.12}
        className="relative z-10 grid gap-6 md:grid-cols-3"
      >
        {trustItems.map((item) => (
          <StaggerItem key={item.title} className="h-full">
            <article className="group flex h-full flex-col gap-5 rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal/15 to-sage/25 text-teal transition-transform duration-300 group-hover:scale-105">
                <Icon name={item.icon} className="h-7 w-7" aria-hidden />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-xl font-medium leading-snug text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
