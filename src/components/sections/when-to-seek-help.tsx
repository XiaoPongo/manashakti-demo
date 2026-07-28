"use client";

import * as React from "react";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { FadeUp, Stagger, StaggerItem } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { whenToSeekHelp } from "@/lib/clinic-data";

/**
 * WhenToReachOut — a calm, mindmap-style visualization.
 *
 * Desktop (lg+): a radial mindmap — central node ("Your well-being") with
 * branches curving out to each sign, drawn with SVG connectors.
 *
 * Mobile: an elegant grid of cards (mindmaps don't read well on narrow
 * screens).
 */

// Precomputed node positions on a circle (percent), 10 nodes, radius ~37%.
// angle_i = -90 + i*36 deg (start at top, clockwise)
const NODE_POSITIONS: { x: number; y: number }[] = [
  { x: 50, y: 13 },
  { x: 72.5, y: 20 },
  { x: 86.4, y: 39 },
  { x: 86.4, y: 61 },
  { x: 72.5, y: 80 },
  { x: 50, y: 87 },
  { x: 27.5, y: 80 },
  { x: 13.6, y: 61 },
  { x: 13.6, y: 39 },
  { x: 27.5, y: 20 },
];

export function WhenToSeekHelp() {
  return (
    <Section
      id="when-to-reach-out"
      className="relative overflow-hidden bg-muted/30"
    >
      {/* soft decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 -z-0 h-80 w-80 rounded-full bg-sage/20 blur-3xl animate-float-slow"
      />

      <SectionHeading
        eyebrow="When to Reach Out"
        title="You don't have to wait for things to feel unbearable"
        description="There's no threshold you have to meet. If something feels hard, that's reason enough to reach out."
      />

      {/* ===== Desktop: radial mindmap ===== */}
      <FadeUp className="mt-14 hidden lg:block" delay={0.05}>
        <div
          className="relative mx-auto aspect-square w-full max-w-3xl"
          role="img"
          aria-label="Mindmap of signs that it may help to reach out, radiating from your well-being at the centre."
        >
          {/* SVG connectors */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            aria-hidden
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="branch-grad" x1="50%" y1="50%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {/* Curved branches from centre (50,50) to each node */}
            {NODE_POSITIONS.map((pos, i) => {
              const midX = (50 + pos.x) / 2;
              const midY = (50 + pos.y) / 2;
              // gentle perpendicular offset for an organic curve
              const dx = pos.x - 50;
              const dy = pos.y - 50;
              const len = Math.hypot(dx, dy) || 1;
              const offset = 4;
              const cx = midX + (-dy / len) * offset;
              const cy = midY + (dx / len) * offset;
              return (
                <path
                  key={i}
                  d={`M 50 50 Q ${cx} ${cy} ${pos.x} ${pos.y}`}
                  fill="none"
                  stroke="url(#branch-grad)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {/* Central node */}
          <div
            className="absolute left-1/2 top-1/2 z-10 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-teal to-teal/80 text-center text-teal-foreground shadow-soft-lg ring-4 ring-sage/30"
          >
            <Icon name="HeartHandshake" className="h-7 w-7" aria-hidden />
            <span className="mt-1 font-serif text-xs font-semibold leading-tight">
              Your
              <br />
              well-being
            </span>
          </div>

          {/* Surrounding nodes */}
          {whenToSeekHelp.map((item, i) => {
            const pos = NODE_POSITIONS[i] ?? NODE_POSITIONS[0];
            const iconName = item.icon as IconName;
            return (
              <div
                key={item.title}
                className="group absolute z-20 w-40 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card px-3 py-3 text-center shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-soft-lg">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sage/30 to-teal/15 text-teal transition-transform duration-300 group-hover:scale-110">
                    <Icon name={iconName} className="h-4.5 w-4.5" aria-hidden />
                  </span>
                  <span className="font-serif text-sm font-medium leading-tight text-foreground">
                    {item.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeUp>

      {/* ===== Mobile / tablet: grid of cards ===== */}
      <Stagger
        stagger={0.07}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:hidden"
      >
        {whenToSeekHelp.map((item) => {
          const iconName = item.icon as IconName;
          return (
            <StaggerItem key={item.title} className="h-full">
              <article className="group flex h-full items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-300 hover:border-sage/50 hover:shadow-soft-lg">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sage/25 to-teal/15 text-teal transition-transform duration-300 group-hover:scale-105">
                  <Icon name={iconName} className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-serif text-sm font-medium leading-tight text-foreground">
                  {item.title}
                </span>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* Callout strip */}
      <FadeUp delay={0.1}>
        <div className="mt-14 flex flex-col items-start gap-4 rounded-3xl border border-teal/20 bg-gradient-to-r from-teal/10 via-sage/10 to-transparent p-6 shadow-soft sm:flex-row sm:items-center sm:p-8">
          <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal/15 text-teal">
            <Icon name="Sparkles" className="h-7 w-7" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-serif text-xl font-medium leading-snug text-foreground sm:text-2xl">
              Seeking help early often leads to better outcomes.
            </p>
            <p className="text-sm text-muted-foreground">
              You don&apos;t have to wait for things to feel unbearable —
              reaching out now is a quiet act of care for yourself.
            </p>
          </div>
        </div>
      </FadeUp>
    </Section>
  );
}
