"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem, FadeUp } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { payments } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

const paymentDescriptors: Record<string, string> = {
  UPI: "GPay · PhonePe · Paytm",
  Cash: "Accepted at the clinic",
  Card: "Debit & Credit cards",
  Insurance: "Please enquire",
};

const chipTints = [
  "bg-teal/12 text-teal",
  "bg-sage/25 text-teal",
  "bg-teal/12 text-teal",
  "bg-sage/25 text-teal",
];

export function Payments() {
  return (
    <Section id="payments" className="bg-beige/40">
      <SectionHeading
        eyebrow="Payments"
        title="Simple, flexible payments"
        description="We accept multiple payment methods for your convenience."
      />

      <Stagger
        stagger={0.07}
        className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-4"
      >
        {payments.map((payment, idx) => {
          const tint = chipTints[idx % chipTints.length];
          const isInsurance = payment.label === "Insurance";
          return (
            <StaggerItem key={payment.label} className="h-full">
              <div
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-3 rounded-3xl border border-border bg-card p-6 text-center shadow-soft",
                  "transition-all duration-300",
                  "hover:-translate-y-1 hover:shadow-soft-lg hover:border-sage/50"
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                    tint
                  )}
                >
                  <Icon
                    name={payment.icon as IconName}
                    className="h-7 w-7"
                    aria-hidden
                  />
                </span>
                <p className="font-serif text-lg font-medium leading-none text-foreground">
                  {payment.label}
                </p>
                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    isInsurance
                      ? "text-muted-foreground"
                      : "text-muted-foreground/80"
                  )}
                >
                  {paymentDescriptors[payment.label] ?? ""}
                </p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeUp className="mt-10 sm:mt-12" delay={0.05}>
        <p className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-sage/40 bg-sage/15 px-5 py-2.5 text-sm font-medium text-teal">
          <Icon name="Check" className="h-4 w-4" aria-hidden />
          Estimates shared upfront. No hidden charges.
        </p>
      </FadeUp>
    </Section>
  );
}
