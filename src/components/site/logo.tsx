import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
}

/** Manashakti logo — uses the official brand asset from /public/brand.
 *  Big & bold, no enclosing circle/frame. */
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
        width={44}
        height={44}
        priority={priority}
        className="h-10 w-10 sm:h-11 sm:w-11 object-contain"
      />
      {showWordmark ? (
        <span
          className={cn(
            "font-serif text-xl sm:text-2xl font-bold tracking-tight text-foreground",
            wordmarkClassName
          )}
        >
          Manashakti
        </span>
      ) : null}
    </span>
  );
}
