import { NextResponse } from "next/server";
import Stripe from "stripe";

function toBase64Url(json: any) {
  const b64 = Buffer.from(JSON.stringify(json)).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json().catch(() => ({}));
    if (!email) return NextResponse.json({ ok:false, error:"missing email" }, { status: 400 });

    const key = process.env.STRIPE_SECRET_KEY || "";
    if (!key) return NextResponse.json({ ok:false, error:"missing STRIPE_SECRET_KEY" }, { status: 500 });

    const stripe = new Stripe(key);

    const payload = { email, exp: Date.now() + 15*60*1000 }; // +15 min
    const token = toBase64Url(payload);
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [{
        price_data: {
          currency: "sek",
          unit_amount: 9900, // 99 SEK
          product_data: { name: 'Process Pack — "City Lines" (demo)' },
        },
        quantity: 1,
      }],
      success_url: `${base}/unlock?token=${token}`,
      cancel_url: `${base}/?canceled=1`,
    });

    return NextResponse.json({ ok:true, url: session.url });
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e?.message || String(e), type: e?.type, code: e?.code }, { status: 500 });
  }
}
