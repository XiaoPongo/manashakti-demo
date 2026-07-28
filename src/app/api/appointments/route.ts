import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  age: z.string().optional(),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  consultationType: z.enum(["clinic", "online"]).default("clinic"),
  reason: z.string().max(2000).optional(),
  bookingFor: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
        { status: 400 }
      );
    }

    const appointment = await db.appointment.create({
      data: {
        name: parsed.data.name,
        age: parsed.data.age ?? null,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        preferredDate: parsed.data.preferredDate || null,
        preferredTime: parsed.data.preferredTime || null,
        consultationType: parsed.data.consultationType,
        reason: parsed.data.reason ?? null,
        bookingFor: parsed.data.bookingFor ?? null,
      },
    });

    return NextResponse.json({ ok: true, id: appointment.id });
  } catch (err) {
    console.error("[appointments] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or call us." },
      { status: 500 }
    );
  }
}
