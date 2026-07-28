"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon, type IconName } from "@/components/site/icon";
import { useAccessibility } from "@/components/site/accessibility-provider";
import { cn } from "@/lib/utils";

const FONT_SIZES = [
  { value: "base", label: "A", className: "text-sm" },
  { value: "lg", label: "A", className: "text-base" },
  { value: "xl", label: "A", className: "text-lg" },
] as const;

/**
 * Accessibility popover: font size, high contrast, reduced motion.
 * Uses the shared AccessibilityProvider context.
 */
export function AccessibilityPanel() {
  const {
    fontSize,
    contrast,
    reduceMotion,
    setFontSize,
    setContrast,
    setReduceMotion,
    reset,
  } = useAccessibility();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Accessibility options"
          className="h-10 w-10 rounded-full text-foreground hover:bg-sage/15 hover:text-teal"
        >
          <Icon name="Accessibility" className="h-5 w-5" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-72 rounded-2xl border-border p-4 shadow-soft"
      >
        <div className="mb-4 flex items-center gap-2">
          <Icon name="Accessibility" className="h-4 w-4 text-teal" aria-hidden />
          <h3 className="font-serif text-base font-semibold text-foreground">
            Accessibility
          </h3>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Font Size
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {FONT_SIZES.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFontSize(f.value)}
                aria-pressed={fontSize === f.value}
                aria-label={`Font size ${f.value}`}
                className={cn(
                  "flex h-11 items-center justify-center rounded-xl border transition-all",
                  fontSize === f.value
                    ? "border-teal bg-teal/10 text-teal shadow-soft"
                    : "border-border bg-card text-foreground hover:bg-sage/15"
                )}
              >
                <span className={cn("font-semibold", f.className)}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="my-3 h-px bg-border" role="separator" />

        {/* Contrast toggle */}
        <ToggleRow
          icon="Contrast"
          label="High Contrast"
          active={contrast === "high"}
          onClick={() =>
            setContrast(contrast === "high" ? "default" : "high")
          }
        />

        <div className="my-3 h-px bg-border" role="separator" />

        {/* Reduce motion */}
        <ToggleRow
          icon="Pause"
          label="Reduce Motion"
          active={reduceMotion === "true"}
          onClick={() =>
            setReduceMotion(reduceMotion === "true" ? "auto" : "true")
          }
        />

        <Button
          variant="ghost"
          onClick={reset}
          className="mt-4 h-9 w-full rounded-xl text-sm text-muted-foreground hover:bg-sage/15 hover:text-teal"
        >
          <Icon name="RefreshCw" className="mr-2 h-4 w-4" aria-hidden />
          Reset to defaults
        </Button>
      </PopoverContent>
    </Popover>
  );
}

function ToggleRow({
  icon,
  label,
  active,
  onClick,
}: {
  icon: IconName;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-3 py-2.5 transition-all hover:bg-sage/15"
    >
      <span className="flex items-center gap-2.5 text-sm font-medium text-foreground">
        <Icon name={icon} className="h-4 w-4 text-teal" aria-hidden />
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          active ? "bg-teal" : "bg-muted-foreground/30"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-soft transition-all",
            active ? "left-[1.375rem]" : "left-0.5"
          )}
        />
      </span>
    </button>
  );
}
