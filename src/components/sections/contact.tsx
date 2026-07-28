"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";
import { contact } from "@/lib/clinic-data";
import { useBooking } from "@/components/site/booking-context";

interface ContactMethod {
  icon: "Phone" | "MessageCircle" | "Mail";
  accent: "teal" | "sage";
  label: string;
  value: string;
  ctaLabel: string;
  ctaHref?: string;
  onClick?: () => void;
}

/**
 * Contact — phone, WhatsApp, email cards + address & instagram row.
 */
export function Contact() {
  const { openWhatsApp } = useBooking();

  const methods: ContactMethod[] = [
    {
      icon: "Phone",
      accent: "teal",
      label: "Call us",
      value: contact.phoneDisplay,
      ctaLabel: "Call now",
      ctaHref: `tel:${contact.phoneDial}`,
    },
    {
      icon: "MessageCircle",
      accent: "sage",
      label: "Chat on WhatsApp",
      value: "Quick replies, gentle support",
      ctaLabel: "Open WhatsApp",
      onClick: () => openWhatsApp(),
    },
    {
      icon: "Mail",
      accent: "teal",
      label: "Email us",
      value: contact.email,
      ctaLabel: "Send email",
      ctaHref: `mailto:${contact.email}`,
    },
  ];

  return (
    <Section id="contact" className="bg-background">
      <SectionHeading
        eyebrow="Contact"
        title="Reach out to us today"
        description="We're here to listen — by phone, WhatsApp, or email."
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.1}>
        {methods.map((m) => (
          <StaggerItem key={m.label}>
            <article className="group flex h-full flex-col rounded-3xl bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  m.accent === "teal"
                    ? "bg-teal/12 text-teal"
                    : "bg-sage/20 text-sage-foreground"
                }`}
                aria-hidden
              >
                <Icon name={m.icon} className="h-6 w-6" />
              </span>

              <h3 className="mt-5 font-serif text-lg font-medium text-foreground">
                {m.label}
              </h3>
              <p className="mt-1.5 break-words text-sm text-muted-foreground">
                {m.value}
              </p>

              <div className="mt-5 pt-1">
                {m.ctaHref ? (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                  >
                    <a
                      href={m.ctaHref}
                      aria-label={`${m.ctaLabel} — ${m.value}`}
                    >
                      {m.ctaLabel}
                      <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                ) : (
                  <Button
                    onClick={m.onClick}
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                  >
                    {m.ctaLabel}
                    <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Address + Instagram row */}
      <FadeUp delay={0.15} className="mt-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-border/70 bg-muted/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal/10 text-teal">
              <Icon name="MapPin" className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Visit our clinic
              </p>
              <p className="mt-0.5 text-sm text-foreground sm:text-base">
                {contact.address.full}
              </p>
            </div>
          </div>

          <Button
            asChild
            variant="ghost"
            size="sm"
            className="w-fit gap-2 rounded-full"
          >
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on Instagram ${contact.instagramHandle} (opens in a new tab)`}
            >
              <Icon name="Instagram" className="h-4 w-4 text-teal" />
              {contact.instagramHandle}
              <Icon name="ExternalLink" className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </FadeUp>
    </Section>
  );
}
