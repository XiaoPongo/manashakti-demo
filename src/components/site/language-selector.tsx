"use client";

import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/components/site/icon";
import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", native: "English" },
  { code: "hi", native: "हिन्दी" },
  { code: "mr", native: "मराठी" },
  { code: "kok", native: "कोंकणी" },
] as const;

/**
 * Compact language dropdown (Popover) with a Globe icon.
 * PLACEHOLDER — selecting a non-English language shows a sonner toast.
 */
export function LanguageSelector() {
  const [current, setCurrent] = React.useState<string>("en");

  const handleSelect = (code: string) => {
    if (code === "en") {
      setCurrent("en");
      return;
    }
    toast("Language selection coming soon.", {
      description: "We're working on multi-language support.",
    });
  };

  const active =
    LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          aria-label="Select language"
          className="h-10 gap-1.5 rounded-full px-3 text-foreground hover:bg-sage/15 hover:text-teal"
        >
          <Icon name="Globe" className="h-5 w-5" aria-hidden />
          <span className="hidden text-sm font-medium sm:inline">
            {active.native}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-48 rounded-2xl border-border p-1.5 shadow-soft"
      >
        <p className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Language
        </p>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => handleSelect(l.code)}
            aria-pressed={current === l.code}
            className={cn(
              "flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-sm transition-colors",
              "hover:bg-sage/15 hover:text-teal",
              current === l.code
                ? "font-medium text-teal"
                : "text-foreground"
            )}
          >
            <span>{l.native}</span>
            {current === l.code ? (
              <Icon name="Check" className="h-4 w-4" aria-hidden />
            ) : null}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
