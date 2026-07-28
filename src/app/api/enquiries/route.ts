import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  message: z.string().min(5, "Please tell us how we can help.").max(2000),
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

    const enquiry = await db.enquiry.create({
      data: {
        name: parsed.data.name,
        phone: parsed.data.phone,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ok: true, id: enquiry.id });
  } catch (err) {
    console.error("[enquiries] error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or call us." },
      { status: 500 }
    );
  }
}
