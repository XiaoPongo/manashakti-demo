import * as React from "react";
import { cn } from "@/lib/utils";

/** Abstract, calming organic blobs used as section background decoration. */
export function CalmBlobs({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "sage" | "teal";
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className={cn(
          "absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-50 animate-float-slow",
          variant === "teal" ? "bg-teal/20" : variant === "sage" ? "bg-sage/40" : "bg-sage/30"
        )}
      />
      <div
        className={cn(
          "absolute top-1/3 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40 animate-float-slower",
          variant === "teal" ? "bg-teal/15" : "bg-teal/10"
        )}
      />
      <div
        className={cn(
          "absolute -bottom-24 left-1/4 h-72 w-72 rounded-full blur-3xl opacity-30 animate-float-slow",
          variant === "sage" ? "bg-sage/40" : "bg-beige"
        )}
      />
    </div>
  );
}

/** A single soft organic SVG wave divider. */
export function WaveDivider({
  className,
  fill = "currentColor",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("w-full h-[60px] sm:h-[100px]", flip && "rotate-180", className)}
    >
      <path
        fill={fill}
        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,120L0,120Z"
      />
    </svg>
  );
}
