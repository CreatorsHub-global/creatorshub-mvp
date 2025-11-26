'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function CreatorPage() {
  const [creatorName, setCreatorName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [what, setWhat] = useState("");
  const [price, setPrice] = useState("");
  const [slots, setSlots] = useState("25");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const headerLine = creatorName
    ? `${creatorName} – Specialdrop för mina fans`
    : "Din specialdrop för dina fans";

  const previewTitle = title || "Mitt speciella verk / process-pack";
  const previewDesc =
    desc ||
    "Ett extra viktigt verk där jag bjuder in mina riktiga fans bakom kulisserna.";
  const previewWhat =
    what ||
    "Skisser, process-steg, hi-res nedladdning och en personlig kommentar.";
  const previewPrice = price || "10";
  const previewSlots = slots || "25";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Jag är kreatör
        </h1>

        <p className="text-lg text-neutral-300 mb-8 text-center">
          Fyll i detta korta formulär så ser du direkt en enkel förhandsvisning
          av hur din första CreatorsHub-drop skulle kunna se ut.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Formulär */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm text-neutral-400 mb-1">
                Ditt namn eller din signatur som kreatör
              </label>
              <input
                type="text"
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                placeholder={`T.ex. "Aspman Studio" eller "Westerberg Studio"`}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm text-neutral-400 mb-1">
                Titel på ditt verk / paket
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`T.ex. "City Lines – process-pack"`}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm text-neutral-400 mb-1">
                Kort beskrivning
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Vad är det för typ av verk, och varför är det viktigt för dig?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div className="text-left">
              <label className="block text-sm text-neutral-400 mb-1">
                Vad vill du dela med dina fans?
              </label>
              <textarea
                value={what}
                onChange={(e) => setWhat(e.target.value)}
                placeholder="T.ex. skisser, process-steg, hi-res, video, kommentar…"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
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
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm text-neutral-400 mb-1">
                  Antal fans (platser)
                </label>
                <input
                  type="text"
                  value={slots}
                  onChange={(e) => setSlots(e.target.value)}
                  placeholder="T.ex. 25 eller 50"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-sm text-neutral-400 mb-1">
                Din e-post (så vi kan kontakta dig i verkligheten)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="namn@exempel.se"
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90"
            >
              Visa förhandsvisning
            </button>

            <div className="text-sm text-neutral-500 mt-3">
              Inget sparas eller skickas ännu – detta är bara en demo för att
              visa hur det kan se ut.
            </div>

            <div className="mt-6">
  <Link
    href="/"
    className="text-sm text-neutral-400 hover:text-neutral-200 underline"
  >
    Tillbaka till startsidan
  </Link>
</div>

          </form>

          {/* Förhandsvisning */}
          <div className="border border-neutral-800 rounded-3xl p-6 bg-neutral-950/70 text-left">
            <div className="text-xs tracking-widest uppercase text-neutral-400 mb-2">
              Förhandsvisning – fansens vy
            </div>

            <h2 className="text-sm md:text-base font-semibold mb-1 text-neutral-200">
              {headerLine}
            </h2>

            <h3 className="text-2xl font-bold mb-2">{previewTitle}</h3>
            <p className="text-neutral-300 mb-4">{previewDesc}</p>

            <div className="mb-4">
              <div className="text-sm text-neutral-400 mb-1">
                Det här får dina fans:
              </div>
              <p className="text-neutral-200 whitespace-pre-line">
                {previewWhat}
              </p>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
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
                  Max {previewSlots} fans
                </div>
              </div>
            </div>

            <button className="w-full px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 mb-2">
              Lås upp detta verk
            </button>

            {submitted && (
              <div className="mt-4 text-sm text-emerald-400">
                Tack! Formuläret är ifyllt – i en riktig version skulle vi nu
                skapa din riktiga drop och kontakta dig på {email || "din e-post"}.
              </div>
            )}

            {!submitted && (
              <div className="mt-4 text-sm text-neutral-500">
                När du klickar “Visa förhandsvisning” uppdateras denna ruta med
                dina egna texter.
              </div>
            )}

            <div className="mt-6 text-right text-xs text-neutral-500">
              powered by CreatorsHub
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
