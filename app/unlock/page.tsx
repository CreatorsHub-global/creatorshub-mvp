/* eslint-disable @next/next/no-img-element */
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic"; // undvik statisk prerender av /unlock

function b64urlDecode(s: string) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  s += "=".repeat(pad);
  try { return atob(s); } catch { return ""; }
}

function UnlockInner() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  let payload: any = null;
  try { payload = JSON.parse(b64urlDecode(token)); } catch {}

  const valid = payload && payload.email && payload.exp && payload.exp > Date.now();
  const [receiptSent, setReceiptSent] = useState(false);

  useEffect(() => {
    if (!valid) return;
    const key = `receipt:${token}`;
    if (typeof window !== "undefined" && !localStorage.getItem(key)) {
      fetch("/api/receipt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      }).then(() => {
        localStorage.setItem(key, "1");
        setReceiptSent(true);
      }).catch(() => {});
    }
  }, [valid, token]);

  const demoImages = [
    { full: "https://picsum.photos/seed/ch1/1600/900", caption: "Sketch → Lines → Color" },
    { full: "https://picsum.photos/seed/ch2/1600/900", caption: "Perspective study" },
    { full: "https://picsum.photos/seed/ch3/1600/900", caption: "Color variants" },
  ];

  if (!valid) {
    return (
      <main className="min-h-screen grid place-items-center bg-neutral-950 text-neutral-100 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Länken är ogiltig eller utgången</h1>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <div className="font-semibold">CreatorsHub</div>
          <div className="text-neutral-400 text-sm">Unlocked for {payload.email}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-2">Upplåst! Tack för ditt stöd 🙌</h2>
        <p className="text-neutral-400 mb-6">Nedan ser du process-stegen och kan ladda ner filerna. (Demo)</p>

        <div className="grid md:grid-cols-3 gap-4">
          {demoImages.map((img, i) => (
            <figure key={i} className="rounded-xl overflow-hidden border border-neutral-800">
              <img src={img.full} alt={img.caption} className="w-full h-56 object-cover" />
              <figcaption className="p-3 text-sm text-neutral-300">{img.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href="/process-pack-demo.zip"
            download
            className="px-4 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-900 inline-block"
          >
            Ladda ner allt (.zip)
          </a>
          <Link
            href="/"
            className="px-4 py-3 rounded-xl border border-neutral-800 hover:bg-neutral-900 inline-block"
          >
            Till startsidan
          </Link>
        </div>

        {receiptSent && (
          <p className="text-neutral-500 text-sm mt-6">Kvitto & länk skickades till {payload.email}.</p>
        )}
      </main>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen grid place-items-center bg-neutral-950 text-neutral-100 p-6">
        <div className="text-center"><p>Laddar…</p></div>
      </main>
    }>
      <UnlockInner />
    </Suspense>
  );
}
