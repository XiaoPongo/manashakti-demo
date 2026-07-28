"use client";

import * as React from "react";
import { FadeUp } from "@/components/site/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <FadeUp
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          <span className="h-1.5 w-1.5 rounded-full bg-sage" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-serif text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.12] text-balance text-foreground",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">
          {description}
        </p>
      ) : null}
    </FadeUp>
  );
}
