"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreatorPage() {
  const [creatorName, setCreatorName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [what, setWhat] = useState("");
  const [price, setPrice] = useState("");
  const [slots, setSlots] = useState(""); // tomt = ingen gräns
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showImages, setShowImages] = useState(false);
const [unlocked, setUnlocked] = useState(false);

  const defaultImages = [
    "https://picsum.photos/seed/ch1/800/600",
    "https://picsum.photos/seed/ch2/800/600",
    "https://picsum.photos/seed/ch3/800/600",
  ];

    const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
    setShowImages(true);
  };


  const headerLine = creatorName
    ? `${creatorName} – backstage-paket för mina fans`
    : "Ditt backstage-paket för dina fans";

  const previewTitle = title || 'Backstage-paket – "City Lines"';
  const previewDesc =
    desc ||
    "Ett paket där jag bjuder in mina riktiga fans bakom kulisserna till hur bilden blev till.";
  const previewWhat =
    what ||
    "3–6 bilder eller serierutor · skisser · process-steg · kort kommentar om hur jag tänkte.";
  const previewPrice = price || "99";
  const previewSlots = slots.trim(); // tomt = ingen gräns

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Huvudinnehåll */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto w-full px-6 py-10">
          {/* Tillbaka-länk */}
          <div className="mb-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-neutral-200 underline"
            >
              ← Tillbaka till startsidan
            </Link>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
  Skapa ditt backstage-paket
</h1>

<p className="text-sm md:text-base text-neutral-400 mb-8 text-center md:text-left">
  3–6 bilder, skisser och process – för dina fans.
</p>



          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Formulär */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <label className="block text-sm text-neutral-400 mb-1">
                  Ditt namn / signatur
                </label>
                <input
                  type="text"
                  value={creatorName}
                  onChange={(e) => setCreatorName(e.target.value)}
                  placeholder={`T.ex. "Aspman Studio" eller "Westberg Studio"`}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm text-neutral-400 mb-1">
                  Titel på ditt backstage-paket
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={`T.ex. "City Lines – backstage-pack"`}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm text-neutral-400 mb-1">
                  Kort beskrivning (1–2 meningar)
                </label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Kort om verket och processen."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm text-neutral-400 mb-1">
                  Vad vill du dela med dina fans?
                </label>
                <textarea
                  value={what}
                  onChange={(e) => setWhat(e.target.value)}
                  placeholder="Skisser · 3–6 bilder · hi-res · kort text"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-sm text-neutral-400 mb-1">
                    Pris (SEK)
                  </label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="T.ex. 99"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm text-neutral-400 mb-1">
                    Begränsat antal platser (valfritt)
                  </label>
                  <input
                    type="text"
                    value={slots}
                    onChange={(e) => setSlots(e.target.value)}
                    placeholder="Tomt = ingen gräns"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="text-sm text-neutral-500">
                Demo – inget sparas eller skickas.
              </div>

              <button
                type="submit"
                className="mt-2 w-full px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 text-sm md:text-base"
              >
                Visa förhandsvisning
              </button>
            </form>

            {/* Förhandsvisning */}
            <div id="preview" className="border border-neutral-800 rounded-3xl p-6 bg-neutral-950/70 text-left">
              <div className="text-xs tracking-widest uppercase text-neutral-400 mb-2">
                Förhandsvisning – fansens vy
              </div>

              <h2 className="text-sm md:text-base font-semibold mb-1 text-neutral-200">
                {headerLine}
              </h2>

              <h3 className="text-2xl font-bold mb-2">{previewTitle}</h3>
              <p className="text-neutral-300 mb-4">{previewDesc}</p>

                            {/* Visuell remsa – 3 större rutor med defaultbilder i demo */}
              <div className="mb-6">
                <div className="text-xs text-neutral-400 mb-2">
                  Backstage-bilder (demo)
                </div>
                <div className="flex gap-3">
                  {defaultImages.map((src, i) => (
                    <div
                      key={i}
                      className="flex-1 h-28 md:h-44 rounded-xl bg-neutral-800 border border-neutral-700 overflow-hidden"
                    >
                      {showImages && (
                       <img
            src={src}
            alt={`Backstage-bild ${i + 1}`}
            className={`w-full h-full object-cover transition-all duration-300 ${
              !unlocked ? "blur-md scale-105" : ""
            }`}
          />
        )}
                    </div>
                  ))}
                </div>
              </div>


              <div className="mb-4">
                <div className="text-sm text-neutral-400 mb-1">
                  Det här får dina fans:
                </div>
                <p className="text-neutral-200 whitespace-pre-line text-sm md:text-base">
                  {previewWhat}
                </p>
              </div>

              <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                <div>
                  <div className="text-sm text-neutral-400">Pris</div>
                  <div className="text-3xl font-extrabold">
                    {previewPrice}
                    <span className="text-base font-normal text-neutral-400 ml-1">
                      SEK
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-neutral-400">Platser</div>
                  <div className="text-lg text-neutral-200">
                    {previewSlots
                      ? `Max ${previewSlots} fans`
                      : "Ingen gräns på antal fans"}
                  </div>
                </div>
              </div>

              <button
  className="w-full px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 mb-2 text-sm md:text-base"
  onClick={() => setUnlocked(true)}
>
  {unlocked ? "Upplåst – tack för stödet!" : "Lås upp backstage-paketet"}
</button>

              {submitted && (
                <div className="mt-4 text-sm text-emerald-400">
                  Tack! Ditt backstage-paket är skapat. I skarp version blir ditt drop en egen CreatorsHub-sida med länk till dina fans.
                </div>
              )}

              {!submitted && (
                <div className="mt-4 text-sm text-neutral-500">
                  När du klickar “Visa förhandsvisning” markerar du paketet som
                  klart. I MVP:en skulle du få en länk du kan lägga i din bio.
                </div>
              )}

              <div className="mt-6 text-right text-xs text-neutral-500">
                powered by CreatorsHub
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER – samma avsändare som på startsidan */}
      <footer className="border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-neutral-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>CreatorsHub · byggt i Stockholm</div>
          <div>
            Ansvarig: <span className="font-medium">James Mehks</span> ·{" "}
            <a
              href="mailto:james@creatorshub.global"
              className="underline hover:text-neutral-200"
            >
              james@creatorshub.global
            </a>{" "}
            ·{" "}
            <a
              href="https://www.instagram.com/creatorshub.global"
              target="_blank"
              className="underline hover:text-neutral-200"
            >
              Instagram: @creatorshub.global
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
