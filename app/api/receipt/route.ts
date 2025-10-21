import { NextResponse } from "next/server";
import { Resend } from "resend";

function b64urlDecode(s: string) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  s += "=".repeat(pad);
  try { return Buffer.from(s, "base64").toString("utf8"); } catch { return ""; }
}

export async function POST(req: Request) {
  const { token } = await req.json().catch(() => ({}));
  if (!token) return NextResponse.json({ ok:false, error:"missing token" }, { status: 400 });

  let payload: any = null;
  try { payload = JSON.parse(b64urlDecode(token)); } catch {}
  if (!payload?.email || !payload?.exp || payload.exp < Date.now()) {
    return NextResponse.json({ ok:false, error:"invalid or expired token" }, { status: 400 });
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${base}/unlock?token=${token}`;

  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "CreatorsHub <onboarding@resend.dev>";

  if (!key) return NextResponse.json({ ok:true, sent:false, reason:"no_resend_key" });

  const resend = new Resend(key);
  const result = await resend.emails.send({
    from,
    to: payload.email,
    subject: "Kvitto & länk – CreatorsHub",
    html: `<p>Tack för ditt stöd!</p><p>Här är din länk igen:</p><p><a href="${url}">${url}</a></p>`,
    text: `Tack! Din länk: ${url}`,
  });

  const id = (result as any)?.data?.id ?? null;
  return NextResponse.json({ ok:true, sent: Boolean(id), id });
}
