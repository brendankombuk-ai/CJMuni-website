import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Enquiry endpoint.
 *
 * This validates the submission and returns success. It does NOT send email —
 * no mail/CRM service is configured. To wire it up, add a provider call where
 * indicated below (e.g. Resend, SendGrid, an SMTP relay, or a CRM webhook) and
 * set the relevant environment variables.
 */

const schema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.string().min(1).max(120),
  message: z.string().min(10).max(4000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // --- Integration point -------------------------------------------------
  // await sendEnquiryEmail(parsed.data);
  // or: await fetch(process.env.CRM_WEBHOOK_URL!, { method: "POST", body: ... })
  // ---------------------------------------------------------------------
  console.info("[CJ MUNI enquiry]", {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
