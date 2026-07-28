"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { FadeUp } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";

/**
 * Privacy — a calm, reassuring strip emphasising confidentiality.
 */
export function Privacy() {
  return (
    <Section
      className="bg-soft-sage"
      containerClassName="max-w-5xl"
    >
      <FadeUp>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal to-teal/90 p-8 text-teal-foreground shadow-soft-lg sm:p-12">
          {/* Decorative glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sage/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-amber-soft/20 blur-3xl"
          />

          <div className="relative flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
              <Icon name="Lock" className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="mt-6 font-serif text-2xl font-medium sm:text-3xl text-balance">
              Your privacy matters.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-teal-foreground/85 sm:text-lg">
              Everything discussed during your consultation is treated with
              strict confidentiality. We follow rigorous confidentiality
              guidelines to ensure your privacy and comfort.
            </p>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
