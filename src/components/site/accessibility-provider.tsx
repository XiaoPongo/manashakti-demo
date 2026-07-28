"use client";

import * as React from "react";

type FontSize = "base" | "lg" | "xl";
type Contrast = "default" | "high";
type ReduceMotion = "auto" | "true";

interface AccessibilityState {
  fontSize: FontSize;
  contrast: Contrast;
  reduceMotion: ReduceMotion;
  setFontSize: (v: FontSize) => void;
  setContrast: (v: Contrast) => void;
  setReduceMotion: (v: ReduceMotion) => void;
  reset: () => void;
}

const AccessibilityContext = React.createContext<AccessibilityState | null>(null);

export function useAccessibility() {
  const ctx = React.useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return ctx;
}

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = React.useState<FontSize>("base");
  const [contrast, setContrast] = React.useState<Contrast>("default");
  const [reduceMotion, setReduceMotion] = React.useState<ReduceMotion>("auto");

  React.useEffect(() => {
    const html = document.documentElement;
    html.dataset.fontsize = fontSize;
  }, [fontSize]);

  React.useEffect(() => {
    const html = document.documentElement;
    html.dataset.contrast = contrast;
  }, [contrast]);

  React.useEffect(() => {
    const html = document.documentElement;
    if (reduceMotion === "true") {
      html.dataset.reduceMotion = "true";
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      html.dataset.reduceMotion = mq.matches ? "true" : "false";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduceMotion]);

  const reset = React.useCallback(() => {
    setFontSize("base");
    setContrast("default");
    setReduceMotion("auto");
  }, []);

  const value = React.useMemo(
    () => ({ fontSize, contrast, reduceMotion, setFontSize, setContrast, setReduceMotion, reset }),
    [fontSize, contrast, reduceMotion, reset]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}
