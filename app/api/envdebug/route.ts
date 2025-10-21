import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const keys = ["RESEND_API_KEY", "STRIPE_SECRET_KEY", "NEXT_PUBLIC_SITE_URL", "NODE_ENV", "VERCEL"];
  const values: Record<string, string | null> = {};
  for (const k of keys) {
    const v = process.env[k];
    values[k] = v ? (k.includes("KEY") ? "[set]" : v) : null;
  }
  return NextResponse.json({ ok: true, values });
}
