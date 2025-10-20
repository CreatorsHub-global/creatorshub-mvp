'use client';

import { useSearchParams } from "next/navigation";
import React from "react";

function b64urlDecode(s: string) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4 ? 4 - (s.length % 4) : 0;
  s += "=".repeat(pad);
  try { return atob(s); } catch { return ""; }
}

export default function UnlockPage() {
  const sp = useSearchParams();
  const token = sp.get("token") || "";
  let payload: any = null;
  try { payload = JSON.parse(b64urlDecode(token)); } catch {}

  const valid = payload && payload.email && payload.exp && payload.exp > Date.now();

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
          <p className="text-neutral-400">Be om en ny magisk länk eller köp igen.</p>
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
      </main>
    </div>
  );
}
