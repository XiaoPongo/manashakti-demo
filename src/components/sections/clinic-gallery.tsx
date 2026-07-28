"use client";

import * as React from "react";
import Image from "next/image";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/site/motion";
import { Icon } from "@/components/site/icon";

const photos = [
  {
    src: "/brand/clinic-interior-1.png",
    alt: "Calming waiting area at Manashakti clinic with warm natural light and comfortable seating",
    caption: "A calm space to settle in",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/brand/clinic-interior-2.png",
    alt: "Tranquil consultation room with sage green accents and soft lighting at Manashakti",
    caption: "Where we talk, together",
    span: "",
  },
  {
    src: "/brand/clinic-interior-3.png",
    alt: "Welcoming reception area at Manashakti with teal accents and natural materials",
    caption: "A warm welcome",
    span: "",
  },
] as const;

/**
 * ClinicGallery — a calm, editorial photo grid of the clinic's interior.
 * Helps visitors picture the space before they arrive.
 */
export function ClinicGallery() {
  return (
    <Section id="gallery" className="relative overflow-hidden bg-background">
      <SectionHeading
        eyebrow="The Space"
        title="A space designed to put you at ease"
        description="Warm, quiet and unhurried — every corner of the clinic is made to help you feel safe the moment you walk in."
      />

      <Stagger
        stagger={0.1}
        className="mt-12 grid auto-rows-[200px] gap-4 sm:auto-rows-[240px] sm:gap-5 lg:grid-cols-3"
      >
        {photos.map((photo, idx) => (
          <StaggerItem
            key={photo.src}
            className={photo.span || "lg:col-span-1"}
          >
            <figure className="group relative h-full w-full overflow-hidden rounded-3xl border border-border shadow-soft">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  idx === 0
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 1024px) 100vw, 33vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* gradient veil for caption legibility */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/20 to-transparent"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Icon
                    name={idx === 0 ? "HeartHandshake" : idx === 1 ? "MessageCircleHeart" : "Sparkles"}
                    className="h-4 w-4 text-white"
                    aria-hidden
                  />
                </span>
                <span className="font-serif text-base font-medium text-white drop-shadow-sm sm:text-lg">
                  {photo.caption}
                </span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeUp delay={0.1} className="mt-8">
        <p className="text-center text-sm text-muted-foreground">
          Illustrative renders of the clinic atmosphere — visit in person to
          experience the calm for yourself.
        </p>
      </FadeUp>
    </Section>
  );
}
