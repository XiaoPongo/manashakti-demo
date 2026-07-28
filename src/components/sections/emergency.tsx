"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { FadeUp } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";

/**
 * Emergency — a calm amber info box directing visitors to emergency services.
 * NOT a red alarming alert — reassuring tone, clear actions.
 */
export function Emergency() {
  return (
    <Section
      className="bg-background"
      containerClassName="max-w-5xl"
    >
      <FadeUp>
        <div className="rounded-3xl border border-amber-soft/60 bg-amber-soft/15 p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-soft/40 text-amber-900 dark:text-amber-100"
              aria-hidden
            >
              <Icon name="AlertTriangle" className="h-6 w-6" />
            </span>

            <div className="flex-1">
              <h3 className="font-serif text-xl font-medium text-foreground">
                Mental Health Emergency
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                This clinic does not provide emergency psychiatric services. If
                you or someone you know is experiencing a mental health
                emergency or thoughts of self-harm, please contact your nearest
                emergency services immediately.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-2xl border-amber-soft/70 bg-background/60 text-foreground hover:bg-amber-soft/30"
                >
                  <a href="tel:112" aria-label="Call 112 — India emergency number">
                    <Icon name="Phone" className="h-4 w-4 text-amber-900 dark:text-amber-200" />
                    Call 112 (India Emergency)
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground sm:text-sm">
                  Helplines:{" "}
                  <span className="font-medium text-foreground">
                    iCall
                  </span>{" "}
                  (9152987821) &middot;{" "}
                  <span className="font-medium text-foreground">
                    Vandrevala Foundation
                  </span>{" "}
                  (1860-2662-345)
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
