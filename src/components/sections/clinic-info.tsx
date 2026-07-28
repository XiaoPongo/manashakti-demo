"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, FadeIn } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";
import { contact, workingHours } from "@/lib/clinic-data";
import { useBooking } from "@/components/site/booking-context";

/**
 * ClinicInfo — working hours, parking, quick contact + Google Maps embed.
 */
export function ClinicInfo() {
  const { openWhatsApp } = useBooking();
  // 0 = Sunday in JS Date
  const todayIndex = new Date().getDay();
  // workingHours is Mon..Sun — Sunday is index 6 in array, but JS getDay() returns 0 for Sunday.
  const arrayIndex = todayIndex === 0 ? 6 : todayIndex - 1;
  const todayInfo = workingHours[arrayIndex];
  const isOpenToday = todayInfo?.open ?? false;

  return (
    <Section id="clinic" className="bg-soft-sage">
      <SectionHeading
        eyebrow="Visit"
        title="Clinic information"
        description="A calm, welcoming space in the heart of Margao, Goa."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Left column — info cards */}
        <FadeUp className="flex flex-col gap-6">
          {/* Working Hours card */}
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                  <Icon name="Clock" className="h-5 w-5" />
                </span>
                <h3 className="font-serif text-xl font-medium text-foreground">
                  Working Hours
                </h3>
              </div>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  isOpenToday
                    ? "bg-sage/20 text-sage-foreground"
                    : "bg-amber-soft/40 text-foreground"
                }`}
                aria-live="polite"
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOpenToday ? "bg-emerald-500" : "bg-amber-soft"
                  }`}
                  aria-hidden
                />
                {isOpenToday ? "Open today" : "Closed today"}
              </span>
            </div>

            <ul className="mt-5 divide-y divide-border/70">
              {workingHours.map((row, i) => {
                const isToday = i === arrayIndex;
                return (
                  <li
                    key={row.day}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isToday
                        ? "bg-sage/10 font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isToday ? (
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-teal"
                          aria-hidden
                        />
                      ) : null}
                      {row.day}
                      {isToday ? (
                        <span className="sr-only">Today</span>
                      ) : null}
                    </span>
                    <span className={row.open ? "" : "text-amber-soft"}>
                      {row.hours}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Parking card */}
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-7">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sage/15 text-sage-foreground">
                <Icon name="ParkingCircle" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-medium text-foreground">
                  Parking &amp; Access
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {contact.parking}
                </p>
              </div>
            </div>
          </div>

          {/* Quick contact row */}
          <FadeIn className="grid gap-3 sm:grid-cols-3">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto justify-start gap-2.5 rounded-2xl px-4 py-3 text-left"
            >
              <a href={`tel:${contact.phoneDial}`} aria-label={`Call ${contact.phoneDisplay}`}>
                <Icon name="Phone" className="h-4 w-4 text-teal" />
                <span className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Call
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-auto justify-start gap-2.5 rounded-2xl px-4 py-3 text-left"
            >
              <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`}>
                <Icon name="Mail" className="h-4 w-4 text-teal" />
                <span className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Email me
                  </span>
                </span>
              </a>
            </Button>

            <Button
              onClick={() => openWhatsApp()}
              size="lg"
              className="h-auto justify-start gap-2.5 rounded-2xl bg-teal px-4 py-3 text-left text-teal-foreground hover:bg-teal/90"
            >
              <Icon name="MessageCircle" className="h-4 w-4" />
              <span className="flex flex-col items-start">
                <span className="text-[11px] uppercase tracking-wide text-teal-foreground/80">
                  Chat
                </span>
                <span className="text-sm font-semibold">WhatsApp</span>
              </span>
            </Button>
          </FadeIn>
        </FadeUp>

        {/* Right column — Map */}
        <FadeUp delay={0.1} className="flex flex-col gap-4">
          <div className="relative h-full min-h-[360px] overflow-hidden rounded-3xl shadow-soft-lg ring-1 ring-border/60">
            <iframe
              src={contact.mapsEmbed}
              title="Manashakti clinic location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
              allowFullScreen
            />
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full justify-center gap-2 rounded-2xl"
          >
            <a
              href={contact.mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get directions to Manashakti clinic (opens in a new tab)"
            >
              <Icon name="Navigation" className="h-4 w-4 text-teal" />
              Get Directions
            </a>
          </Button>
        </FadeUp>
      </div>
    </Section>
  );
}
