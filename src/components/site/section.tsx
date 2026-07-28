import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClassName?: string;
  id?: string;
}

/** Consistent vertical rhythm + max-width container for all sections. */
export function Section({
  as: Tag = "section",
  className,
  containerClassName,
  children,
  id,
  ...props
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative py-20 sm:py-28", className)}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
