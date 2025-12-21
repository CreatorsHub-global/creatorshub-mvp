import { NextResponse } from "next/server";
import { Resend } from "resend";

function toBase64Url(json: any) {
  const b64 = Buffer.from(JSON.stringify(json)).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (!email) return NextResponse.json({ ok: false, error: "missing email" }, { status: 400 });

  const payload = { email, exp: Date.now() + 15 * 60 * 1000 }; // +15 min
  const token = toBase64Url(payload);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${base}/unlock?token=${token}`;

  const key = process.env.RESEND_API_KEY;
  const fromEnv = process.env.EMAIL_FROM || "";
  const from = /@.+/.test(fromEnv) ? fromEnv : "CreatorsHub <onboarding@resend.dev>";

  if (!key) return NextResponse.json({ ok: true, url, sent: false, reason: "no_resend_key" });

  const resend = new Resend(key);
  const result = await resend.emails.send({
    from,
    to: email,
    subject: "Din magiska lnk – CreatorsHub",
    html: `<p>Hej!</p><p>Här är din magiska länk:</p><p><a href="${url}">${url}</a></p><p>Giltig i 15 minuter.</p>`,
    text: `Hej! Din magiska länk: ${url} (giltig i 15 minuter)`,
  });

  const id = (result as any)?.data?.id ?? null;
  const error = (result as any)?.error ?? null;

  return NextResponse.json({ ok: true, url, sent: Boolean(id) && !error, id, error, raw: result });
}
