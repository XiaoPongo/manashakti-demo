import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
  priority?: boolean;
  /** Pixel size of the logo image. Default 44 (h-11). Use 56 for the navbar. */
  imgSize?: number;
}

/** Manashakti logo — uses the official brand asset from /public/brand.
 *  Big & bold, no enclosing circle/frame. */
export function Logo({
  className,
  showWordmark = true,
  wordmarkClassName,
  priority = false,
  imgSize = 44,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/manashakti-logo.png"
        alt="Manashakti logo"
        width={imgSize}
        height={imgSize}
        priority={priority}
        style={{ width: imgSize, height: imgSize }}
        className="object-contain"
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
