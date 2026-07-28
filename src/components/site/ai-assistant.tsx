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
import { contact } from "@/lib/clinic-data";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const DISCLAIMER =
  "I can answer general questions and help you book appointments. I cannot provide medical advice.";

const INITIAL_MESSAGE: ChatMessage = {
  id: "greeting",
  role: "assistant",
  content:
    "Hello, I'm Manu — the Manashakti assistant. I can help you with general questions about our services, hours and bookings. Please note: I cannot provide medical advice. How can I help you today?",
};

const QUICK_PROMPTS = [
  "How do I book?",
  "What services do you offer?",
  "Are online consultations available?",
  "Is it confidential?",
];

/**
 * AIAssistant — floating "Manu" chat widget (bottom-left).
 * Connects to /api/chat. Always shows the medical disclaimer.
 */
export function AIAssistant() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    INITIAL_MESSAGE,
  ]);
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isSending]);

  // Focus textarea when opened.
  React.useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => {
        textareaRef.current?.focus();
      }, 220);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Close on Escape.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const sendMessage = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setIsSending(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) {
          throw new Error(`Chat request failed: ${res.status}`);
        }

        const data = (await res.json()) as { ok?: boolean; reply?: string };
        const reply =
          (data?.reply ?? "").trim().length > 0
            ? data.reply!.trim()
            : "I'm sorry, I couldn't quite catch that. Could you rephrase?";

        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: reply,
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: `I'm having a little trouble right now. Please call us at ${contact.phoneDisplay} or message on WhatsApp, and we'll be glad to help.`,
          },
        ]);
      } finally {
        setIsSending(false);
      }
    },
    [messages, isSending]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const handleQuickPrompt = (prompt: string) => {
    void sendMessage(prompt);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
  };

  const showQuickPrompts = messages.length <= 1 && !isSending;

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
            className="pointer-events-auto absolute bottom-[4.5rem] left-0 flex max-h-[70vh] w-[calc(100vw-1.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-border/70 glass shadow-soft-lg sm:w-[380px]"
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
                  className="h-9 w-9 rounded-xl object-cover"
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
                onClick={resetChat}
                aria-label="Reset conversation"
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

            {/* Messages */}
            <div
              ref={scrollRef}
              className="scroll-elegant flex-1 space-y-3 overflow-y-auto bg-background/40 px-3 py-4"
              style={{ minHeight: "180px" }}
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {isSending ? <TypingIndicator /> : null}

              {/* Quick prompts */}
              {showQuickPrompts ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_PROMPTS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleQuickPrompt(p)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-teal/50 hover:bg-teal/10 hover:text-teal"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-border/60 bg-card/60 p-3"
            >
              <div className="flex items-end gap-2">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  rows={1}
                  disabled={isSending}
                  aria-label="Type your message"
                  className="max-h-32 min-h-[44px] flex-1 resize-none rounded-2xl bg-background px-3 py-2.5 text-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isSending}
                  aria-label="Send message"
                  className="h-11 w-11 shrink-0 rounded-2xl bg-teal text-teal-foreground hover:bg-teal/90"
                >
                  <Icon
                    name={isSending ? "Loader2" : "Send"}
                    className={`h-4 w-4 ${isSending ? "animate-spin" : ""}`}
                  />
                </Button>
              </div>

              {/* Footer link */}
              <div className="mt-2 flex items-center justify-between px-1">
                <a
                  href={`tel:${contact.phoneDial}`}
                  className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-teal"
                >
                  <Icon name="Phone" className="h-3 w-3" aria-hidden />
                  Prefer to talk? Call us
                </a>
                <span className="text-[10px] text-muted-foreground">
                  Enter to send &middot; Shift+Enter for newline
                </span>
              </div>
            </form>
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
            {/* Pulsing ring */}
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
            {/* AI label badge */}
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

/** Single chat message bubble. */
function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
          isUser
            ? "rounded-br-md bg-teal text-teal-foreground"
            : "rounded-bl-md bg-card text-foreground ring-1 ring-border/60"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}

/** Three-dot typing indicator. */
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-card px-3.5 py-3 ring-1 ring-border/60">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            aria-hidden
          />
        ))}
        <span className="sr-only">Manu is typing</span>
      </div>
    </div>
  );
}
