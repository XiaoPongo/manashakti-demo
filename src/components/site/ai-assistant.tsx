"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@/components/site/icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { contact, whatsappLink } from "@/lib/clinic-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DISCLAIMER =
  "I can answer general questions and help you reach the clinic. I cannot provide medical advice.";

type Topic = {
  key: string;
  label: string;
  icon: string;
  prefix: string;
};

const TOPICS: Topic[] = [
  {
    key: "appointment",
    label: "Book appointment",
    icon: "CalendarPlus",
    prefix: "Hello, I would like to book a new appointment.",
  },
  {
    key: "followup",
    label: "Follow-up",
    icon: "CalendarClock",
    prefix: "Hello, I need a follow-up consultation.",
  },
  {
    key: "online",
    label: "Online consult",
    icon: "Video",
    prefix:
      "Hello, I would like to book an online (video) consultation.",
  },
  {
    key: "medication",
    label: "Medication query",
    icon: "Pill",
    prefix: "Hello, I have a medication-related question.",
  },
  {
    key: "general",
    label: "General question",
    icon: "MessageCircleQuestion",
    prefix: "Hello, I have a general enquiry.",
  },
];

const SUGGESTIONS = [
  "What are your working hours?",
  "Do I need a referral?",
  "Is the consultation confidential?",
  "How long is a session?",
];

/**
 * AIAssistant — floating "Manu" helper (bottom-left).
 * A static, privacy-first assistant: it helps you compose a message and sends
 * it to the clinic on WhatsApp. No backend, no LLM — works on static hosting.
 * Always shows the medical-advice disclaimer.
 */
export function AIAssistant() {
  const [open, setOpen] = React.useState(false);
  const [activeTopic, setActiveTopic] = React.useState<Topic>(TOPICS[4]);
  const [message, setMessage] = React.useState("");

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => textareaRef.current?.focus(), 220);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const composedMessage = React.useMemo(() => {
    const detail = message.trim();
    return detail ? `${activeTopic.prefix}\n\n${detail}` : activeTopic.prefix;
  }, [activeTopic, message]);

  const sendOnWhatsApp = () => {
    window.open(whatsappLink(composedMessage), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp…", {
      description: "Your message is ready to send — just hit send.",
    });
    setOpen(false);
    setMessage("");
  };

  const applySuggestion = (s: string) => {
    setMessage((prev) => (prev.trim() ? `${prev.trim()}\n${s}` : s));
    textareaRef.current?.focus();
  };

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-6 z-[105]"
      aria-live="polite"
    >
      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            key="ai-panel"
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto absolute bottom-[4.5rem] left-0 flex max-h-[78vh] w-[calc(100vw-1.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border/70 glass shadow-soft-lg sm:w-[380px]"
            role="dialog"
            aria-label="Manu — Manashakti assistant"
            aria-modal="false"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/60 bg-teal/10 px-4 py-3.5">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-teal/15 ring-1 ring-teal/20">
                <Image
                  src="/brand/manashakti-logo.png"
                  alt="Manu avatar"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-emerald-500"
                  aria-hidden
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-base font-semibold text-foreground">
                  Manu
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  Manashakti Assistant
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setActiveTopic(TOPICS[4]);
                }}
                aria-label="Reset message"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon name="RefreshCw" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon name="X" className="h-4 w-4" />
              </button>
            </div>

            {/* Disclaimer banner */}
            <div className="flex items-start gap-2 border-b border-amber-soft/40 bg-amber-soft/15 px-4 py-2.5">
              <Icon
                name="AlertTriangle"
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-900 dark:text-amber-200"
                aria-hidden
              />
              <p className="text-[11px] leading-snug text-foreground/80">
                {DISCLAIMER}
              </p>
            </div>

            {/* Body */}
            <div className="scroll-elegant flex-1 overflow-y-auto bg-background/40 px-4 py-4">
              <p className="text-sm leading-relaxed text-foreground">
                Hi, I&apos;m Manu. I&apos;ll help you put together a message for
                Dr. Arpita&apos;s team on WhatsApp. Pick what you need and add
                any details — I&apos;ll send it across in one tap.
              </p>

              {/* Topic chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setActiveTopic(t)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      activeTopic.key === t.key
                        ? "border-teal bg-teal text-teal-foreground shadow-soft"
                        : "border-border bg-card text-foreground hover:border-teal/50 hover:bg-teal/10 hover:text-teal"
                    )}
                  >
                    <Icon name={t.icon} className="h-3.5 w-3.5" aria-hidden />
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Message textarea */}
              <div className="mt-4">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Add details (optional)…"
                  rows={3}
                  aria-label="Your message details"
                  className="resize-none rounded-2xl bg-background text-sm"
                />
              </div>

              {/* Suggestions */}
              <div className="mt-3">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Common questions
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => applySuggestion(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-teal/50 hover:bg-teal/10 hover:text-teal"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-4 rounded-2xl border border-border bg-muted/40 p-3">
                <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Preview
                </p>
                <p className="whitespace-pre-wrap break-words text-xs leading-relaxed text-foreground">
                  {composedMessage}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border/60 bg-card/60 p-3">
              <Button
                type="button"
                onClick={sendOnWhatsApp}
                className="h-11 w-full bg-[#1da851] text-white hover:bg-[#198f47]"
              >
                <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                Send on WhatsApp
              </Button>
              <div className="mt-2 flex items-center justify-between px-1">
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-teal"
                >
                  <Icon name="Phone" className="h-3 w-3" aria-hidden />
                  Prefer to talk? Call us
                </a>
                <span className="text-[10px] text-muted-foreground">
                  No medical advice
                </span>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Floating button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close Manu assistant" : "Ask Manu, our assistant"}
            aria-expanded={open}
            className="pointer-events-auto group relative flex h-14 w-14 items-center justify-center rounded-full bg-teal text-teal-foreground shadow-soft-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/30"
          >
            {!open ? (
              <span
                aria-hidden
                className="absolute inset-0 rounded-full bg-teal/40 motion-safe:animate-ping"
                style={{ animationDuration: "2.4s" }}
              />
            ) : null}
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon name="X" className="h-6 w-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.15 }}
                  className="relative"
                >
                  <Icon name="MessageCircleHeart" className="h-6 w-6" />
                </motion.span>
              )}
            </AnimatePresence>
            {!open ? (
              <span
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-soft px-1 text-[10px] font-bold text-amber-900 ring-2 ring-card"
                aria-hidden
              >
                AI
              </span>
            ) : null}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          Ask Manu, our assistant
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
