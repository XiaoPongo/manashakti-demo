"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/site/icon";

/**
 * Light / dark theme toggle.
 * Renders a placeholder until mounted to avoid hydration mismatch
 * (next-themes resolves theme only on the client).
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Button
      size="icon"
      variant="ghost"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-10 w-10 rounded-full text-foreground hover:bg-sage/15 hover:text-teal"
    >
      {mounted ? (
        <Icon
          name={isDark ? "Sun" : "MoonStar"}
          className="h-5 w-5"
          aria-hidden
        />
      ) : (
        <span className="h-5 w-5" aria-hidden />
      )}
    </Button>
  );
}
