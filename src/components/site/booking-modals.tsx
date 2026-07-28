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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icon } from "@/components/site/icon";
import { useBooking, type BookingKind } from "@/components/site/booking-context";
import {
  contact,
  whatsappLink,
  whatsappMessages,
} from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

/* ---------------- New Appointment Form ---------------- */

function NewAppointmentForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    consultationType: "clinic" as "clinic" | "online",
    reason: "",
  });

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your full name.");
    if (form.phone.trim().length < 7) return toast.error("Please enter a valid phone number.");
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      toast.success("Thank you — your request has been received.", {
        description: "We'll reach out shortly to confirm your appointment.",
      });
      onClose();
    } catch {
      toast.error("Something went wrong. Please call us or try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" required>
          <Input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 ..."
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred Date">
          <Input
            type="date"
            value={form.preferredDate}
            onChange={(e) => set("preferredDate", e.target.value)}
          />
        </Field>
        <Field label="Preferred Time">
          <Input
            type="time"
            value={form.preferredTime}
            onChange={(e) => set("preferredTime", e.target.value)}
          />
        </Field>
      </div>
      <Field label="Consultation Type">
        <RadioGroup
          value={form.consultationType}
          onValueChange={(v) => set("consultationType", v)}
          className="grid grid-cols-2 gap-3"
        >
          <RadioCard value="clinic" label="Clinic Visit" icon="Building2" />
          <RadioCard value="online" label="Online Consultation" icon="Video" />
        </RadioGroup>
      </Field>
      <Field label="Reason for Visit">
        <Textarea
          value={form.reason}
          onChange={(e) => set("reason", e.target.value)}
          placeholder="Briefly, what brings you in? (optional)"
          rows={3}
        />
      </Field>
      <Button type="submit" disabled={loading} className="h-12 w-full text-base">
        {loading ? (
          <>
            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Submit Request <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

/* ---------------- Follow-up Form ---------------- */

function FollowUpForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    patientName: "",
    phone: "",
    previousVisitDate: "",
    preferredTime: "",
  });
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.patientName.trim().length < 2) return toast.error("Please enter the patient's name.");
    if (form.phone.trim().length < 7) return toast.error("Please enter a valid phone number.");
    setLoading(true);
    try {
      const res = await fetch("/api/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      toast.success("Follow-up request received.", {
        description: "We'll confirm your next appointment soon.",
      });
      onClose();
    } catch {
      toast.error("Something went wrong. Please call us or try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Previous Visit Date">
          <Input
            type="date"
            value={form.previousVisitDate}
            onChange={(e) => set("previousVisitDate", e.target.value)}
          />
        </Field>
        <Field label="Preferred Time">
          <Input
            type="time"
            value={form.preferredTime}
            onChange={(e) => set("preferredTime", e.target.value)}
          />
        </Field>
      </div>
      <Button type="submit" disabled={loading} className="h-12 w-full text-base">
        {loading ? (
          <>
            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Submit Request <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

/* ---------------- Online Consultation ---------------- */

function OnlineConsultationContent({ onBookOnline }: { onBookOnline: () => void }) {
  return (
    <div className="grid gap-5">
      <p className="text-sm leading-relaxed text-muted-foreground">
        Online consultations bring the same professional, confidential care to the comfort of your
        home. You'll speak with Dr. Arpita Sirsikar over a secure video call, at a time that suits
        you.
      </p>
      <div className="rounded-2xl border border-sage/30 bg-sage/10 p-4">
        <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Icon name="Video" className="h-4 w-4 text-teal" /> How it works
        </h4>
        <ol className="ml-4 list-decimal space-y-1.5 text-sm text-muted-foreground">
          <li>Book your slot using the button below.</li>
          <li>We confirm your appointment and share a secure video link.</li>
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
      <Button className="h-12 w-full text-base" onClick={onBookOnline}>
        <Icon name="Video" className="mr-2 h-4 w-4" /> Book Online Consultation
      </Button>
    </div>
  );
}

/* ---------------- General Enquiry ---------------- */

function EnquiryForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", phone: "", message: "" });
  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return toast.error("Please enter your name.");
    if (form.phone.trim().length < 7) return toast.error("Please enter a valid phone number.");
    if (form.message.trim().length < 5) return toast.error("Please tell us how we can help.");
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      toast.success("Thank you for reaching out.", {
        description: "We'll get back to you shortly.",
      });
      onClose();
    } catch {
      toast.error("Something went wrong. Please call us or try WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
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
      <Button type="submit" disabled={loading} className="h-12 w-full text-base">
        {loading ? (
          <>
            <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            Send Enquiry <Icon name="Send" className="ml-2 h-4 w-4" />
          </>
        )}
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
    description: "Tell us a little about yourself and we'll take care of the rest.",
  },
  followup: {
    title: "Follow-up Appointment",
    description: "Welcome back. Let's find your next slot.",
  },
  online: {
    title: "Online Consultation",
    description: "Care from the comfort of home.",
  },
  enquiry: {
    title: "General Enquiry",
    description: "Have a question? We're here to help.",
  },
};

export function BookingModals() {
  const { bookingKind, closeBooking, openBooking, whatsappOpen, closeWhatsApp } = useBooking();

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
              <OnlineConsultationContent onBookOnline={() => openBooking("new")} />
            )}
            {bookingKind === "enquiry" && <EnquiryForm onClose={closeBooking} />}
          </div>
        </DialogContent>
      </Dialog>

      <WhatsAppModal open={whatsappOpen} onClose={closeWhatsApp} />
    </>
  );
}

/* ---------------- Shared field + radio card ---------------- */

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

function RadioCard({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: string;
}) {
  return (
    <Label
      htmlFor={`rc-${value}`}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all",
        "hover:border-sage/50 hover:bg-sage/10 has-[:checked]:border-teal has-[:checked]:bg-teal/10 has-[:checked]:shadow-soft"
      )}
    >
      <RadioGroupItem value={value} id={`rc-${value}`} />
      <Icon name={icon} className="h-5 w-5 text-teal" />
      <span className="text-sm font-medium">{label}</span>
    </Label>
  );
}
