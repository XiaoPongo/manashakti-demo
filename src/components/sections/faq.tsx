"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";
import { useBooking } from "@/components/site/booking-context";
import { faqs } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

export function FAQ() {
  const { openWhatsApp } = useBooking();

  return (
    <Section id="faq" className="bg-muted/30">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions I hear often"
        description="Clear answers to help you feel prepared."
      />

      <FadeUp className="mx-auto mt-12 max-w-3xl sm:mt-14">
        <Accordion
          type="single"
          collapsible
          className="flex flex-col gap-3"
          defaultValue="faq-0"
        >
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className={cn(
                "rounded-2xl border border-border bg-card px-5 shadow-soft",
                "data-[state=open]:border-sage/50 data-[state=open]:shadow-soft-lg",
                "transition-all duration-300"
              )}
            >
              <AccordionTrigger className="py-5 text-left font-serif text-lg font-medium text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeUp>

      {/* CTA */}
      <FadeUp className="mt-12 sm:mt-14" delay={0.05}>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-3xl border border-sage/30 bg-sage/10 p-8 text-center shadow-soft sm:p-10">
          <h3 className="font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl">
            Still have questions?
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            I&apos;m here to help however I can — reach out in whatever way
            feels comfortable for you.
          </p>
          <Button
            size="lg"
            className="h-12 rounded-full bg-[#1da851] px-6 text-base text-white shadow-soft hover:bg-[#198f47]"
            onClick={() => openWhatsApp()}
          >
            <Icon name="MessageCircle" className="h-5 w-5" aria-hidden />
            Ask on WhatsApp
          </Button>
        </div>
      </FadeUp>
    </Section>
  );
}
