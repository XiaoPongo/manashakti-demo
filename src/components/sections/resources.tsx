"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Stagger, StaggerItem } from "@/components/site/motion";
import { Icon, type IconName } from "@/components/site/icon";
import { resources } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ResourceType = "Guide" | "Blog" | "FAQ" | "PDF";

const typeMeta: Record<
  ResourceType,
  { badge: string; action: string; actionIcon: IconName }
> = {
  Guide: {
    badge: "border-sage/40 bg-sage/20 text-teal",
    action: "Read",
    actionIcon: "BookOpen",
  },
  Blog: {
    badge: "border-sage/40 bg-sage/20 text-teal",
    action: "Open",
    actionIcon: "ArrowUpRight",
  },
  FAQ: {
    badge: "border-sage/40 bg-sage/20 text-teal",
    action: "View",
    actionIcon: "HelpCircle",
  },
  PDF: {
    badge: "border-sage/40 bg-sage/20 text-teal",
    action: "Download",
    actionIcon: "Download",
  },
};

const chipTints = [
  "bg-teal/12 text-teal",
  "bg-sage/25 text-teal",
  "bg-amber-soft/40 text-teal",
];

export function Resources() {
  const handleComingSoon = (title: string) => {
    toast.info("This resource is coming soon.", {
      description: title,
    });
  };

  return (
    <Section id="resources" className="bg-background">
      <SectionHeading
        eyebrow="Patient Resources"
        title="Resources to support your journey"
        description="Gentle, practical guides — free to explore whenever you're ready."
      />

      <Stagger
        stagger={0.07}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:mt-14"
      >
        {resources.map((resource, idx) => {
          const type = resource.type as ResourceType;
          const meta = typeMeta[type];
          const tint = chipTints[idx % chipTints.length];
          const isFaq = type === "FAQ";
          const content = (
            <>
              {/* Top row: icon chip + type badge */}
              <div className="flex items-start justify-between gap-3">
                <span
                  className={cn(
                    "inline-flex h-14 w-14 items-center justify-center rounded-2xl",
                    tint
                  )}
                >
                  <Icon
                    name={resource.icon as IconName}
                    className="h-7 w-7"
                    aria-hidden
                  />
                </span>
                <Badge
                  variant="outline"
                  className={cn("rounded-full px-3 py-1", meta.badge)}
                >
                  {resource.type}
                </Badge>
              </div>

              <h3 className="mt-5 font-serif text-xl font-medium leading-snug text-foreground">
                {resource.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {resource.description}
              </p>

              {/* Footer action */}
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                {meta.action}
                <Icon
                  name={meta.actionIcon}
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
            </>
          );

          return (
            <StaggerItem key={resource.title} className="h-full">
              {isFaq ? (
                <a
                  href="#faq"
                  className={cn(
                    "group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-soft",
                    "transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-soft-lg hover:border-sage/50",
                    "outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {content}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => handleComingSoon(resource.title)}
                  className={cn(
                    "group flex h-full w-full flex-col items-start rounded-3xl border border-border bg-card p-6 text-left shadow-soft",
                    "transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-soft-lg hover:border-sage/50",
                    "outline-none focus-visible:ring-2 focus-visible:ring-teal/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                  aria-label={`${meta.action} ${resource.title}`}
                >
                  {content}
                </button>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
