"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, Parallax, Stagger, StaggerItem } from "@/components/site/motion";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { Icon, type IconName } from "@/components/site/icon";
import { clinic } from "@/lib/clinic-data";

export function AboutDoctor() {
  return (
    <Section id="about" className="relative overflow-hidden bg-background">
      {/* soft decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-0 h-80 w-80 rounded-full bg-sage/20 blur-3xl animate-float-slow"
      />

      <SectionHeading
        eyebrow="Meet Your Doctor"
        title={clinic.doctorName}
        description={clinic.doctorTitle}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* LEFT — portrait + floating glass card */}
        <FadeUp className="relative">
          <Parallax offset={30} className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* decorative blob behind */}
              <div
                aria-hidden
                className="absolute -inset-5 -z-10 rounded-[2.5rem] bg-gradient-to-br from-sage/50 via-teal/15 to-transparent blur-2xl"
              />
              <div
                aria-hidden
                className="absolute -right-8 top-10 -z-10 h-44 w-44 rounded-full bg-sage/40 blur-3xl animate-float-slower"
              />

              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/40 shadow-soft-lg ring-1 ring-sage/30">
                <Image
                  src="/brand/dr-arpita-sirsikar.png"
                  alt={`${clinic.doctorName}, ${clinic.doctorTitle}`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 35vw"
                  className="object-cover object-top"
                />
              </div>

              {/* Floating glass card — qualifications */}
              <div className="glass absolute -bottom-6 -left-4 w-60 rounded-2xl p-4 shadow-soft sm:-left-8 sm:w-64">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal/15 text-teal">
                    <Icon name="GraduationCap" className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="font-serif text-sm font-semibold text-foreground">
                    Qualifications
                  </p>
                </div>
                <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-3.5 w-3.5 text-teal" aria-hidden />
                    MBBS — GMC, Goa
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-3.5 w-3.5 text-teal" aria-hidden />
                    Senior Consultant, Tele MANAS
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" className="h-3.5 w-3.5 text-teal" aria-hidden />
                    IPS &amp; IMA Member
                  </li>
                </ul>
              </div>
            </div>
          </Parallax>
        </FadeUp>

        {/* RIGHT — bio + timeline + expertise + memberships + awards */}
        <div className="flex flex-col gap-10">
          {/* Bio */}
          <FadeUp>
            <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
              {clinic.doctorBio}
            </p>
          </FadeUp>

          {/* Education & Experience timeline */}
          <FadeUp>
            <div>
              <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-foreground">
                <Icon name="GraduationCap" className="h-5 w-5 text-teal" aria-hidden />
                Education &amp; Experience
              </h3>
              <Stagger
                stagger={0.08}
                className="mt-5 space-y-0 border-l-2 border-sage/40 pl-6"
              >
                {clinic.experience.map((item, i) => (
                  <StaggerItem key={`${item.role}-${i}`} className="relative">
                    <span
                      className="absolute -left-[1.85rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-teal shadow-soft"
                      aria-hidden
                    />
                    <p className="font-medium text-foreground">{item.role}</p>
                    <p className="text-sm text-muted-foreground">{item.place}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeUp>

          {/* Areas of Expertise */}
          <FadeUp>
            <div>
              <h3 className="flex items-center gap-2 font-serif text-xl font-medium text-foreground">
                <Icon name="Brain" className="h-5 w-5 text-teal" aria-hidden />
                Areas of Expertise
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {clinic.expertise.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="rounded-full border-sage/50 bg-sage/15 px-3 py-1 text-xs font-medium text-teal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Memberships + Recognition */}
          <FadeUp>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-foreground">
                  <Icon name="Users" className="h-5 w-5 text-teal" aria-hidden />
                  Memberships
                </h3>
                <ul className="mt-3 space-y-2">
                  {clinic.memberships.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Icon
                        name="Check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-teal"
                        aria-hidden
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-foreground">
                  <Icon name="Award" className="h-5 w-5 text-teal" aria-hidden />
                  Recognition
                </h3>
                <ul className="mt-3 space-y-2">
                  {clinic.awards.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Icon
                        name="Award"
                        className="mt-0.5 h-4 w-4 shrink-0 text-amber-soft"
                        aria-hidden
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Statistics */}
      <FadeUp className="mt-16 sm:mt-20">
        <Stagger
          stagger={0.1}
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {clinic.stats.map((stat, i) => {
            const statIcons: IconName[] = [
              "Clock",
              "HeartHandshake",
              "Target",
              "Star",
            ];
            const iconForStat = statIcons[i] ?? "Activity";
            return (
              <StaggerItem key={stat.label}>
                <Card className="items-center gap-2 rounded-2xl border-border bg-card p-6 text-center shadow-soft">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sage/20 text-teal">
                    <Icon name={iconForStat} className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="font-serif text-3xl font-semibold text-teal sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                    {stat.label}
                  </p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </FadeUp>
    </Section>
  );
}
