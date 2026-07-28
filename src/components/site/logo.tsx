import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
}

/** Manashakti logo — uses the official brand asset from /public/brand. */
export function Logo({
  className,
  showWordmark = true,
  wordmarkClassName,
  priority = false,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/manashakti-logo.png"
        alt="Manashakti logo"
        width={40}
        height={40}
        priority={priority}
        className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl object-cover ring-1 ring-sage/30"
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-serif text-xl sm:text-[1.35rem] font-semibold tracking-tight text-foreground",
            wordmarkClassName
          )}
        >
          Manashakti
        </span>
      ) : null}
    </span>
  );
}
