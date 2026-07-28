import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  patientName: z.string().min(2, "Please enter the patient's name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  previousVisitDate: z.string().optional(),
  preferredTime: z.string().optional(),
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

    const followUp = await db.followUp.create({
      data: {
        patientName: parsed.data.patientName,
        phone: parsed.data.phone,
        previousVisitDate: parsed.data.previousVisitDate || null,
        preferredTime: parsed.data.preferredTime || null,
      },
    });

    return NextResponse.json({ ok: true, id: followUp.id });
  } catch (err) {
    console.error("[followups] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or call us." },
      { status: 500 }
    );
  }
}
