import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to") || "";
  const key = process.env.RESEND_API_KEY || "";
  if (!to) return NextResponse.json({ ok:false, error:"missing to" }, { status: 400 });

  try {
    const resend = new Resend(key);
    const result = await resend.emails.send({
      from: "CreatorsHub <onboarding@resend.dev>",
      to,
      subject: "CreatorsHub Test Email",
      text: "If you see this, Resend works.",
    });
    return NextResponse.json({
      ok: true,
      id: (result as any)?.id ?? null,
      result,
      hasKey: Boolean(key),
      keyPrefix: key ? key.slice(0,6) : null
    });
  } catch (e: any) {
    return NextResponse.json({
      ok:false,
      error: e?.message || String(e),
      hasKey: Boolean(key),
      keyPrefix: key ? key.slice(0,6) : null
    }, { status: 500 });
  }
}
