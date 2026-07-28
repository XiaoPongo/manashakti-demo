"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/site/icon";
import { useBooking, type BookingKind } from "@/components/site/booking-context";
import {
  contact,
  whatsappLink,
  whatsappMessages,
} from "@/lib/clinic-data";

/** Open a WhatsApp deep link in a new tab. */
function openWhatsApp(message: string) {
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}

/* ---------------- New Appointment Form ---------------- */
/* Builds a tailored WhatsApp message — WhatsApp is the clinic's main channel. */

function NewAppointmentForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = React.useState({
    name: "",
    age: "",
    phone: "",
    reason: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    if (name.length < 2) return toast.error("Please enter your full name.");
    if (phone.length < 7) return toast.error("Please enter a valid phone number.");

    const lines = [
      "Hello, I would like to book a new appointment.",
      "",
      `Name: ${name}`,
    ];
    if (form.age.trim()) lines.push(`Age: ${form.age.trim()}`);
    lines.push(`Phone: ${phone}`);
    if (form.reason.trim()) lines.push(`Reason for visit: ${form.reason.trim()}`);
    openWhatsApp(lines.join("\n"));

    toast.success("Opening WhatsApp…", {
      description: "Your details are ready to send. Just hit send in WhatsApp.",
    });
    onClose();
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="rounded-2xl border border-sage/30 bg-sage/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Fill in a few details and we&apos;ll open WhatsApp with a ready message for
        Dr. Arpita&apos;s team. You can review and send it in one tap.
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <Input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </Field>
        <Field label="Age">
          <Input
            value={form.age}
            onChange={(e) => set("age", e.target.value)}
            placeholder="e.g. 32"
            inputMode="numeric"
          />
        </Field>
      </div>
      <Field label="Phone" required>
        <Input
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="+91 ..."
          inputMode="tel"
          autoComplete="tel"
        />
      </Field>
      <Field label="Reason for Visit">
        <Textarea
          value={form.reason}
          onChange={(e) => set("reason", e.target.value)}
          placeholder="Briefly, what brings you in? (optional)"
          rows={3}
        />
      </Field>
      <Button type="submit" className="h-12 w-full text-base bg-[#1da851] text-white hover:bg-[#198f47]">
        <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
        Send on WhatsApp
      </Button>
    </form>
  );
}

/* ---------------- Follow-up Form ---------------- */

function FollowUpForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = React.useState({
    patientName: "",
    phone: "",
    previousVisitDate: "",
  });
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const patientName = form.patientName.trim();
    const phone = form.phone.trim();
    if (patientName.length < 2) return toast.error("Please enter the patient's name.");
    if (phone.length < 7) return toast.error("Please enter a valid phone number.");

    const lines = [
      "Hello, I need a follow-up consultation.",
      "",
      `Patient name: ${patientName}`,
      `Phone: ${phone}`,
    ];
    if (form.previousVisitDate.trim())
      lines.push(`Last visit: ${form.previousVisitDate.trim()}`);
    openWhatsApp(lines.join("\n"));

    toast.success("Opening WhatsApp…", {
      description: "Your follow-up request is ready to send.",
    });
    onClose();
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="rounded-2xl border border-sage/30 bg-sage/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Welcome back. Share a few details and we&apos;ll continue the conversation
        on WhatsApp.
      </div>
      <Field label="Patient Name" required>
        <Input
          value={form.patientName}
          onChange={(e) => set("patientName", e.target.value)}
          placeholder="Patient's name"
        />
      </Field>
      <Field label="Phone" required>
        <Input
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="+91 ..."
          inputMode="tel"
        />
      </Field>
      <Field label="Previous Visit Date">
        <Input
          type="date"
          value={form.previousVisitDate}
          onChange={(e) => set("previousVisitDate", e.target.value)}
        />
      </Field>
      <Button type="submit" className="h-12 w-full text-base bg-[#1da851] text-white hover:bg-[#198f47]">
        <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
        Send on WhatsApp
      </Button>
    </form>
  );
}

/* ---------------- Online Consultation ---------------- */

function OnlineConsultationContent({ onClose }: { onClose: () => void }) {
  function bookOnline() {
    openWhatsApp(
      "Hello, I would like to book an online (video) consultation."
    );
    toast.success("Opening WhatsApp…", {
      description: "Mention a preferred time and we'll set up your video call.",
    });
    onClose();
  }

  return (
    <div className="grid gap-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Online consultations bring the same professional, confidential care to the comfort of your
        home. You&apos;ll speak with Dr. Arpita Sirsikar over a secure video call, at a time that suits
        you.
      </p>
      <div className="rounded-2xl border border-sage/30 bg-sage/10 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="Video" className="h-4 w-4 text-teal" /> How it works
        </h4>
        <ol className="ml-4 list-decimal space-y-1.5 text-sm text-muted-foreground">
          <li>Send us a message on WhatsApp using the button below.</li>
          <li>We confirm your slot and share a secure video link.</li>
          <li>Join a few minutes early from a quiet, private space.</li>
          <li>Have your medications and questions handy.</li>
        </ol>
      </div>
      <div className="rounded-2xl border border-border bg-muted/40 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="Wifi" className="h-4 w-4 text-teal" /> Before you begin — a quick checklist
        </h4>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {[
            "Stable internet connection (video on)",
            "A device with working camera & microphone",
            "A private, quiet room where you can talk freely",
            "Headphones, if you'd prefer more privacy",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <Icon name="Check" className="mt-0.5 h-4 w-4 shrink-0 text-sage-foreground" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button className="h-12 w-full text-base bg-[#1da851] text-white hover:bg-[#198f47]" onClick={bookOnline}>
        <Icon name="MessageCircle" className="mr-2 h-4 w-4" /> Book on WhatsApp
      </Button>
    </div>
  );
}

/* ---------------- General Enquiry ---------------- */

function EnquiryForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = React.useState({ name: "", phone: "", message: "" });
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = form.name.trim();
    const phone = form.phone.trim();
    const message = form.message.trim();
    if (name.length < 2) return toast.error("Please enter your name.");
    if (phone.length < 7) return toast.error("Please enter a valid phone number.");
    if (message.length < 5) return toast.error("Please tell us how we can help.");

    const text = [
      "Hello, I have a general enquiry.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      ``,
      message,
    ].join("\n");
    openWhatsApp(text);

    toast.success("Opening WhatsApp…", {
      description: "Your message is ready to send.",
    });
    onClose();
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div className="rounded-2xl border border-sage/30 bg-sage/10 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
        Share your question and we&apos;ll continue the conversation on WhatsApp.
      </div>
      <Field label="Name" required>
        <Input
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Your name"
        />
      </Field>
      <Field label="Phone" required>
        <Input
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="+91 ..."
          inputMode="tel"
        />
      </Field>
      <Field label="Message" required>
        <Textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="How can we help?"
          rows={4}
        />
      </Field>
      <Button type="submit" className="h-12 w-full text-base bg-[#1da851] text-white hover:bg-[#198f47]">
        <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
        Send on WhatsApp
      </Button>
    </form>
  );
}

/* ---------------- WhatsApp Modal ---------------- */

function WhatsAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const options = [
    {
      label: "Book Appointment",
      desc: "Start your first consultation with us.",
      message: whatsappMessages.newAppointment,
      icon: "CalendarPlus" as const,
    },
    {
      label: "Follow-up Appointment",
      desc: "Book your next visit with ease.",
      message: whatsappMessages.followUp,
      icon: "CalendarClock" as const,
    },
    {
      label: "Medication Query",
      desc: "A question about your medication.",
      message: whatsappMessages.medication,
      icon: "Pill" as const,
    },
    {
      label: "General Enquiry",
      desc: "Anything else we can help with.",
      message: whatsappMessages.general,
      icon: "MessageCircleQuestion" as const,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md gap-0 p-0">
        <div className="rounded-t-3xl bg-gradient-to-br from-sage/30 to-teal/10 p-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#1da851]">
              <Icon name="MessageCircle" className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="font-serif text-xl text-foreground">
                How can we help you today?
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Choose an option — we'll open WhatsApp with a ready message.
              </DialogDescription>
            </div>
          </div>
        </div>
        <div className="grid gap-3 p-6">
          {options.map((o) => (
            <a
              key={o.label}
              href={whatsappLink(o.message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-sage/50 hover:bg-sage/10 hover:shadow-soft"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage/20 text-teal">
                <Icon name={o.icon} className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{o.label}</p>
                <p className="truncate text-sm text-muted-foreground">{o.desc}</p>
              </div>
              <Icon
                name="ArrowRight"
                className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
              />
            </a>
          ))}
          <p className="pt-1 text-center text-xs text-muted-foreground">
            Or call us at{" "}
            <a href={`tel:${contact.phoneDial}`} className="font-medium text-teal">
              {contact.phoneDisplay}
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Booking Modal Container ---------------- */

const bookingMeta: Record<
  Exclude<BookingKind, null>,
  { title: string; description: string }
> = {
  new: {
    title: "New Appointment",
    description:
      "Share a few details and we'll open WhatsApp with a ready message for the clinic.",
  },
  followup: {
    title: "Follow-up Appointment",
    description: "Welcome back. We'll continue your care on WhatsApp.",
  },
  online: {
    title: "Online Consultation",
    description: "Care from the comfort of home — arranged over WhatsApp.",
  },
  enquiry: {
    title: "General Enquiry",
    description: "Have a question? We'll send it to the clinic on WhatsApp.",
  },
};

export function BookingModals() {
  const { bookingKind, closeBooking, whatsappOpen, closeWhatsApp } = useBooking();

  const open = bookingKind !== null;

  return (
    <>
      <Dialog open={open} onOpenChange={(o) => !o && closeBooking()}>
        <DialogContent className="max-h-[92vh] max-w-lg overflow-y-auto scroll-elegant">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {bookingKind ? bookingMeta[bookingKind].title : ""}
            </DialogTitle>
            <DialogDescription>
              {bookingKind ? bookingMeta[bookingKind].description : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            {bookingKind === "new" && <NewAppointmentForm onClose={closeBooking} />}
            {bookingKind === "followup" && <FollowUpForm onClose={closeBooking} />}
            {bookingKind === "online" && (
              <OnlineConsultationContent onClose={closeBooking} />
            )}
            {bookingKind === "enquiry" && <EnquiryForm onClose={closeBooking} />}
          </div>
        </DialogContent>
      </Dialog>

      <WhatsAppModal open={whatsappOpen} onClose={closeWhatsApp} />
    </>
  );
}

/* ---------------- Shared field ---------------- */

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label} {required ? <span className="text-teal">*</span> : null}
      </Label>
      {children}
    </div>
  );
}
