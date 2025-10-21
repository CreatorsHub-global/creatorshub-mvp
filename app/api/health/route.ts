import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const stripe = !!process.env["STRIPE_SECRET_KEY"];
  const resend = !!process.env["RESEND_API_KEY"];
  const site   = process.env["NEXT_PUBLIC_SITE_URL"] || "N/A";
  return NextResponse.json({
    ok: true,
    env: { stripe, resend, site },
    time: new Date().toISOString(),
  });
}
