import { NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT } from "@/data/site";

/**
 * Enquiry endpoint.
 *
 * Validates the submission and emails it to CJ MUNI through Resend.
 *
 * Resend is called over its REST API with `fetch` rather than through its SDK.
 * The SDK would be a dependency, a bundle and a version to keep current in
 * exchange for wrapping one POST request, and this endpoint sends exactly one
 * kind of message.
 *
 * Environment:
 *
 *   RESEND_API_KEY   required. Without it nothing is sent and the endpoint
 *                    reports failure rather than pretending to have delivered.
 *   ENQUIRY_FROM     optional. The sender, which must be an address on a
 *                    domain verified in Resend. Defaults to Resend's shared
 *                    onboarding sender, which works immediately but is only
 *                    meant for testing.
 *   ENQUIRY_TO       optional. Defaults to the public address in data/site.ts.
 */

const schema = z.object({
  name: z.string().min(2).max(120),
  company: z.string().min(2).max(160),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  service: z.string().min(1).max(120),
  message: z.string().min(10).max(4000),
  /** Honeypot — hidden in the form, so a value here means a bot filled it. */
  website: z.string().max(200).optional(),
});

type Enquiry = z.infer<typeof schema>;

/**
 * Best-effort per-IP rate limit.
 *
 * This endpoint is public, unauthenticated and sends mail, so an open loop
 * against it costs real money and buries genuine enquiries. The window is held
 * in instance memory: Fluid Compute reuses instances across requests, so this
 * stops the ordinary case, but it is not a guarantee across every instance.
 * The durable layer is a rate-limit rule on the Vercel Firewall — see README.
 */
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);

  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // The map would otherwise grow for the life of the instance.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return false;
}

/** Vercel sets x-forwarded-for; the client address is the first entry. */
const clientIp = (request: Request) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

/** Resend's shared sender. Works with no DNS set up; replace once verified. */
const DEFAULT_FROM = "CJ MUNI Website <onboarding@resend.dev>";

/** Subjects are a single line. Anything pasted into the form is not. */
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function render(enquiry: Enquiry) {
  const rows: Array<[string, string]> = [
    ["Name", enquiry.name],
    ["Company", enquiry.company],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone?.trim() || "—"],
    ["Service", enquiry.service],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    enquiry.message,
  ].join("\n");

  const html = `<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:#111">
    <h2 style="margin:0 0 16px;font-size:17px">Website enquiry</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${label}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <div style="padding:14px 16px;background:#f5f5f5;border-left:3px solid #f1af21;white-space:pre-wrap">${escapeHtml(enquiry.message)}</div>
  </div>`;

  return { text, html };
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries — please try again shortly" },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

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

  const { website, ...enquiry } = parsed.data;

  // Answer 200 so the bot records a success and moves on, rather than probing
  // for what tripped it. Nothing is sent.
  if (website && website.trim() !== "") {
    console.warn("[CJ MUNI enquiry] Honeypot tripped — not sending");
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Deliberately a failure. Answering "ok" with no mail configured loses the
    // enquiry silently — the visitor believes they have been in touch and
    // nobody ever sees it. Failing sends them to the address on the page.
    // Log enough to chase the lead by hand, but not the whole submission —
    // these logs are retained by the platform and the message body is the
    // customer's, not ours.
    console.error(
      "[CJ MUNI enquiry] RESEND_API_KEY is not set — enquiry NOT delivered",
      {
        name: enquiry.name,
        company: enquiry.company,
        email: enquiry.email,
        receivedAt: new Date().toISOString(),
      },
    );
    return NextResponse.json(
      { ok: false, error: "Email is not configured" },
      { status: 503 },
    );
  }

  const { text, html } = render(enquiry);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM || DEFAULT_FROM,
        to: [process.env.ENQUIRY_TO || CONTACT.email],
        // So replying in the mail client goes to the person who enquired,
        // rather than to the sending domain.
        reply_to: enquiry.email,
        subject: oneLine(
          `Website enquiry — ${enquiry.service} — ${enquiry.name}, ${enquiry.company}`,
        ).slice(0, 180),
        text,
        html,
      }),
    });

    if (!response.ok) {
      // Resend puts the reason in the body; without it the logs only say 4xx.
      const detail = await response.text().catch(() => "");
      console.error("[CJ MUNI enquiry] Resend rejected the message", {
        status: response.status,
        detail: detail.slice(0, 500),
      });
      return NextResponse.json(
        { ok: false, error: "Could not send enquiry" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[CJ MUNI enquiry] Could not reach Resend", error);
    return NextResponse.json(
      { ok: false, error: "Could not send enquiry" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
