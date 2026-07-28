"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";
import { contact } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/**
 * Reviews — features the real Google rating (5.0) with a link to the
 * Google Maps listing. Review text is never fabricated; the carousel
 * shows honest placeholders that direct visitors to read verified reviews
 * on Google.
 */
const carouselSlides = [
  "Dr. Arpita Sirsikar is rated 5.0 on Google. Tap to read verified reviews from patients on Google Maps.",
  "Every review on Google reflects a real visit. I share them with consent and gratitude.",
  "Your experience matters. After your visit, consider leaving a review on Google to help others find care.",
];

export function Reviews() {
  return (
    <Section id="reviews" className="bg-muted/30">
      <SectionHeading
        eyebrow="Google Reviews"
        title="Kind words from those I've cared for"
        description="Genuine experiences, shared with consent."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-8 sm:mt-14">
        {/* Summary card — real Google rating */}
        <FadeUp className="h-full">
          <aside
            className={cn(
              "flex h-full flex-col justify-between rounded-3xl border border-sage/30 bg-gradient-to-br from-sage/15 to-teal/5 p-6 shadow-soft sm:p-8"
            )}
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal/12 text-teal">
                  <Icon name="Star" className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <p className="font-serif text-2xl font-medium leading-none text-foreground">
                    Reviews
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    On Google
                  </p>
                </div>
              </div>

              {/* Big rating */}
              <div className="mt-6 flex items-end gap-3">
                <span className="font-serif text-6xl font-bold leading-none text-teal">
                  5.0
                </span>
                <div className="pb-1">
                  <div className="flex items-center gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className="h-4 w-4 fill-amber-soft text-amber-soft"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Verified on Google
                  </p>
                </div>
              </div>
              <p className="sr-only">Rated 5.0 out of 5 on Google</p>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Patients consistently share warm, five-star experiences. Read
                what they have to say on Google — every review is genuine.
              </p>
            </div>

            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-sage/40 bg-sage/15 px-4 py-2 text-sm font-medium text-teal",
                "transition-all hover:bg-sage/25 hover:gap-2.5"
              )}
            >
              <Icon name="ExternalLink" className="h-4 w-4" aria-hidden />
              Read reviews on Google
            </a>
          </aside>
        </FadeUp>

        {/* Carousel */}
        <FadeUp delay={0.05} className="h-full">
          <div className="relative h-full rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <Carousel
              opts={{ align: "center", loop: true }}
              className="w-full"
              aria-label="Patient reviews carousel"
            >
              <CarouselContent>
                {carouselSlides.map((text, idx) => (
                  <CarouselItem key={idx}>
                    <figure className="flex min-h-[18rem] flex-col justify-center gap-5 py-2 sm:min-h-[16rem]">
                      <Icon
                        name="Quote"
                        className="h-10 w-10 text-sage/70"
                        aria-hidden
                      />
                      <blockquote className="font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl">
                        <em className="italic text-muted-foreground">
                          {text}
                        </em>
                      </blockquote>
                      <div
                        className="flex items-center gap-2"
                        aria-label="Five star rating"
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            className="h-5 w-5 fill-amber-soft text-amber-soft"
                            aria-hidden
                          />
                        ))}
                      </div>
                      <figcaption className="text-sm text-muted-foreground">
                        Manashakti · Madgaon, Goa
                      </figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                className="-left-3 sm:-left-5"
                aria-label="Previous review"
              />
              <CarouselNext
                className="-right-3 sm:-right-5"
                aria-label="Next review"
              />
            </Carousel>
          </div>
        </FadeUp>
      </div>
    </Section>
  );
}
