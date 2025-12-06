"use client";

import { useState } from "react";
import Link from "next/link";

export default function FanPage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <section className="max-w-xl w-full border border-neutral-800 rounded-3xl p-6 bg-neutral-950/80 text-left">
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-2">
          Exempel – fansens vy
        </p>

        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Backstage-paket – "City Lines"
        </h1>

        <p className="text-sm md:text-base text-neutral-300 mb-4">
          Litet paket med 3–6 bilder, skisser och en kort kommentar om processen.
        </p>

        {/* Backstage-bilder */}
        <div className="mb-5">
          <div className="text-xs text-neutral-400 mb-2">
            Backstage-bilder (demo)
          </div>
          <div className="flex gap-3">
            {["ch1", "ch2", "ch3"].map((seed, i) => (
              <div
                key={i}
                className="flex-1 h-32 md:h-44 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/seed/${seed}/800/600`}
                  alt={`Backstage-bild ${i + 1}`}
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    !unlocked ? "blur-md scale-105" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm md:text-base text-neutral-200 mb-4">
          3–6 bilder eller serierutor · skisser · process-steg · kort kommentar
          om hur jag tänkte.
        </p>

        <div className="flex items-baseline gap-4 mb-4 flex-wrap">
          <div>
            <div className="text-sm text-neutral-400">Pris</div>
            <div className="text-3xl font-extrabold">
              99
              <span className="text-base font-normal text-neutral-400 ml-1">
                SEK
              </span>
            </div>
          </div>
          <div>
            <div className="text-sm text-neutral-400">Platser</div>
            <div className="text-lg text-neutral-200">
              Ingen gräns på antal fans
            </div>
          </div>
        </div>

        <button
          className="w-full px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 mb-2 text-sm md:text-base"
          onClick={() => setUnlocked(true)}
        >
          {unlocked ? "Upplåst – tack för stödet!" : "Lås upp backstage-paketet"}
        </button>

        <p className="text-xs text-neutral-500 mt-2">
          {unlocked
            ? "Nu ser du paketet som om du hade låst upp det på riktigt. I en skarp version skulle betalning ske innan bilderna blir skarpa."
            : "I en riktig drop skulle du efter betalning få direkt access till alla bilder och texter här inne."}
        </p>

        <div className="mt-6 flex items-center justify-between text-xs text-neutral-500">
          <Link href="/" className="underline hover:text-neutral-200">
            ← Tillbaka till startsidan
          </Link>
          <span>CreatorsHub · demo</span>
        </div>
      </section>
    </main>
  );
}
