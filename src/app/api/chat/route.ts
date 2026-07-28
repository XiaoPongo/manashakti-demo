import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";
import { clinic, contact, workingHours } from "@/lib/clinic-data";

const SYSTEM_PROMPT = `You are "Manu", the gentle AI assistant for Manashakti, a psychiatric clinic in Margao, Goa, India, led by Dr. Arpita Sirsikar (Consultant Psychiatrist).

YOUR ROLE:
- Help visitors understand the clinic's services and guide them toward booking an appointment (by phone, WhatsApp, or the online form).
- Answer general, non-medical questions about the clinic: location, hours, services offered, what to expect, how booking works, confidentiality, and payments.

MANDATORY DISCLAIMER — always keep this in mind and remind visitors when relevant:
"I can answer general questions and help you book appointments. I cannot provide medical advice."

CRITICAL RULES:
1. NEVER provide medical advice, diagnosis, treatment recommendations, medication advice, or interpret symptoms. If a visitor describes symptoms or asks for medical guidance, respond with empathy and gently redirect them to book a consultation. Example: "That sounds difficult — thank you for sharing. I'm not able to offer medical advice, but Dr. Arpita Sirsikar can help. Would you like me to help you book an appointment?"
2. If anyone mentions self-harm, suicidal thoughts, or an emergency, do NOT try to counsel them. Immediately encourage them to contact local emergency services (112 in India) or go to the nearest emergency department. Share the clinic phone (${contact.phoneDisplay}) only as a non-emergency contact.
3. Be warm, calm, concise and reassuring. Use plain language. Avoid clinical jargon.
4. Keep replies short (usually 2-4 sentences) unless the visitor asks for detail.
5. Never invent facts. If unsure, say so and point them to call the clinic.

CLINIC FACTS (use only these):
- Clinic name: ${clinic.name}
- Doctor: ${clinic.doctorName}, ${clinic.doctorTitle}
- Location: ${contact.address.full}
- Phone: ${contact.phoneDisplay}
- WhatsApp: available via ${contact.phoneDisplay}
- Email: ${contact.email}
- Instagram: ${contact.instagramHandle}
- Services include: ${clinic.doctorSpecialties.join(", ")}, plus child/adolescent/geriatric psychiatry, relationship counselling, medication management and lifestyle counselling.
- Consultation types: in-person (clinic), online (video), and home visits within Goa on request.
- Working hours: ${workingHours
    .map((w) => `${w.day} ${w.hours}`)
    .join("; ")}.
- Sessions: typically 30-60 minutes.
- No referral needed — book directly.
- Confidentiality: everything discussed is treated with strict confidentiality.
- Payments accepted: UPI, Cash, Card (insurance — please enquire).
- This clinic does NOT provide emergency psychiatric services.

Always end conversations that involve booking intent by suggesting the visitor use the "Book Appointment" option on the website, call ${contact.phoneDisplay}, or message on WhatsApp.

Begin every new conversation by introducing yourself briefly and stating the disclaimer.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const userMessage: string =
      typeof body?.message === "string" ? body.message : "";

    // Build the message list. The frontend sends the full history.
    const history = messages
      .filter(
        (m: { role?: string; content?: string }) =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .slice(-10)
      .map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      }));

    const finalMessages: { role: string; content: string }[] = [
      { role: "assistant", content: SYSTEM_PROMPT },
      ...history,
    ];
    if (userMessage.trim().length > 0 && history[history.length - 1]?.content !== userMessage) {
      finalMessages.push({ role: "user", content: userMessage });
    }

    const zai = await ZAI.create();
    const completion = await zai.chat.completions.create({
      messages: finalMessages as never,
      thinking: { type: "disabled" },
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        {
          ok: false,
          reply:
            "I'm sorry, I couldn't quite catch that. Could you rephrase, or call us at " +
            contact.phoneDisplay +
            "?",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    console.error("[chat] error", err);
    return NextResponse.json(
      {
        ok: false,
        reply:
          "I'm having a little trouble right now. Please call us at " +
          contact.phoneDisplay +
          " or book via WhatsApp, and we'll be glad to help.",
      },
      { status: 200 }
    );
  }
}
