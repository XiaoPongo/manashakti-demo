"use client";

import * as React from "react";
import { Logo } from "@/components/site/logo";
import { Icon } from "@/components/site/icon";
import { Separator } from "@/components/ui/separator";
import { FadeIn, Stagger, StaggerItem } from "@/components/site/motion";
import { useToast } from "@/hooks/use-toast";
import {
  contact,
  workingHours,
  navLinks,
  clinic,
} from "@/lib/clinic-data";

/**
 * Footer — premium, multi-column footer with brand, links, contact & hours.
 * No booking/WhatsApp/service buttons — those live in the navbar and
 * floating action bar.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  const showComingSoon = (label: string) => {
    toast({
      title: "Coming soon",
      description: `${label} will be available shortly.`,
    });
  };

  return (
    <footer
      role="contentinfo"
      className="relative mt-auto border-t border-border/60 bg-calm-gradient"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Top brand band */}
        <FadeIn className="py-12 sm:py-14">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <Logo priority={false} imgSize={56} showWordmark={false} />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {clinic.doctorName}, {clinic.doctorTitle}. Compassionate,
                evidence-based psychiatric care in a calm, welcoming space in
                Madgaon, Goa — personalized to your unique needs.
              </p>
            </div>
          </div>
        </FadeIn>

        <Separator className="bg-border/70" />

        {/* Columns */}
        <Stagger
          className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {/* Quick Links */}
          <StaggerItem>
            <h4 className="font-serif text-base font-semibold text-foreground">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-teal"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem>
            <h4 className="font-serif text-base font-semibold text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <Icon
                  name="Phone"
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                  aria-hidden
                />
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-teal"
                >
                  {contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon
                  name="Mail"
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                  aria-hidden
                />
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all text-sm text-muted-foreground transition-colors hover:text-teal"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon
                  name="MapPin"
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                  aria-hidden
                />
                <span className="text-sm text-muted-foreground">
                  {contact.address.full}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon
                  name="Instagram"
                  className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                  aria-hidden
                />
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-teal"
                >
                  {contact.instagramHandle}
                </a>
              </li>
            </ul>
          </StaggerItem>

          {/* Hours */}
          <StaggerItem>
            <h4 className="font-serif text-base font-semibold text-foreground">
              Working Hours
            </h4>
            <ul className="mt-4 space-y-2">
              {workingHours.map((w) => (
                <li
                  key={w.day}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-muted-foreground">{w.day}</span>
                  <span
                    className={
                      w.open
                        ? "font-medium text-foreground"
                        : "font-medium text-amber-soft"
                    }
                  >
                    {w.hours}
                  </span>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </Stagger>

        <Separator className="bg-border/70" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-muted-foreground sm:text-sm">
            &copy; {currentYear} {clinic.name}. All rights reserved.
          </p>

          <nav
            aria-label="Legal"
            className="flex items-center gap-4 text-xs text-muted-foreground sm:text-sm"
          >
            <button
              type="button"
              onClick={() => showComingSoon("Privacy Policy")}
              className="transition-colors hover:text-teal"
            >
              Privacy Policy
            </button>
            <span aria-hidden className="text-border">|</span>
            <button
              type="button"
              onClick={() => showComingSoon("Terms")}
              className="transition-colors hover:text-teal"
            >
              Terms
            </button>
          </nav>

          <p className="text-xs italic text-muted-foreground sm:text-sm">
            Designed with care for your well-being.
          </p>
        </div>
      </div>
    </footer>
  );
}
