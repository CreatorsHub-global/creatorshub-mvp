"use client";

import React, { useMemo, useState } from "react";

export default function Page() {
  const [lang, setLang] = useState<"sv" | "en">("sv");
  const [step, setStep] = useState<"landing" | "checkout" | "unlocked">("landing");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = useMemo(() => {
    const sv = {
      heroTitle: "Äg din konst. Bygg din publik. Lås upp intäkter.",
      heroSub: "Ett enkelt CreatorPass som låser upp process, skisser och hi-res för dina fans.",
      ctaPrimary: "Lås upp “Process Pack”",
      ctaSecondary: "Se hur det funkar",
      featuresTitle: "Varför CreatorsHub?",
      features: [
        "Ägd relation: e-post + wallet-lista som du kontrollerar",
        "Snabbt: första droppet kan vara live på ~1–2 timmar",
        "Smidig betalning: kort nu, on-chain under huven",
      ],
      packTitle: "Process Pack – “City Lines” av O. Aspman (demo)",
      includes: "Innehåller",
      items: ["3 verk", "6 skiss-steg", "1 timelapse", "Hi-res nedladdning"],
      price: "Pris",
      unlockNow: "Lås upp nu",
      checkoutTitle: "Checkout (simulerad)",
      emailLabel: "E-post för din magiska länk",
      tosLabel: "Jag godkänner villkor & integritet (demo)",
      payBtn: (p: string) => `Betala ${p} SEK`,
      back: "Tillbaka",
      unlockedTitle: "Upplåst! Tack för ditt stöd 🙌",
      unlockedSub: "Nedan ser du process-stegen och kan ladda ner filerna. (Demo-läge)",
      downloadAll: "Ladda ner allt (.zip) – demo",
      copyLink: "Kopiera magisk länk",
      copied: "Kopierad!",
      mintHint:
        "Vill du prova on-chain? I MVP:en kan vi mynta en CreatorPass (Solana) till din wallet efter betalning.",
      howTitle: "Så funkar det (MVP)",
      howSteps: [
        "Skapa ett Process Pack (3–6 verk + skisser).",
        "Sätt pris och publicera landningssidan.",
        "Fans betalar och får en magisk länk / CreatorPass för åtkomst.",
      ],
      footer: "CreatorsHub · Demo-MVP · 2025",
    };
    const en = {
      heroTitle: "Own your art. Grow your audience. Unlock revenue.",
      heroSub:
        "A simple CreatorPass that unlocks process, sketches and hi-res for your fans.",
      ctaPrimary: "Unlock the “Process Pack”",
      ctaSecondary: "See how it works",
      featuresTitle: "Why CreatorsHub?",
      features: [
        "Owned relationship: email + wallet list under your control",
        "Fast: your first drop can be live in ~1–2 hours",
        "Low-friction payments: card now, on-chain under the hood",
      ],
      packTitle: 'Process Pack – “City Lines” by O. Aspman (demo)',
      includes: "Includes",
      items: ["3 artworks", "6 sketch steps", "1 timelapse", "Hi-res download"],
      price: "Price",
      unlockNow: "Unlock now",
      checkoutTitle: "Checkout (simulated)",
      emailLabel: "Email for your magic link",
      tosLabel: "I accept the terms & privacy (demo)",
      payBtn: (p: string) => `Pay ${p} SEK`,
      back: "Back",
      unlockedTitle: "Unlocked! Thank you for the support 🙌",
      unlockedSub:
        "See the process steps below and download the files. (Demo mode)",
      downloadAll: "Download all (.zip) – demo",
      copyLink: "Copy magic link",
      copied: "Copied!",
      mintHint:
        "Want to try on-chain? In the MVP we can mint a CreatorPass (Solana) to your wallet after payment.",
      howTitle: "How it works (MVP)",
      howSteps: [
        "Create a Process Pack (3–6 pieces + sketches).",
        "Set price and publish the landing page.",
        "Fans pay and receive a magic link / CreatorPass for access.",
      ],
      footer: "CreatorsHub · Demo MVP · 2025",
    };
    return lang === "sv" ? sv : en;
  }, [lang]);

  const priceSEK = "99";

  const demoImages = [
    { thumb: "https://picsum.photos/seed/ch1/800/450", full: "https://picsum.photos/seed/ch1/1600/900", caption: "Sketch → Lines → Color" },
    { thumb: "https://picsum.photos/seed/ch2/800/450", full: "https://picsum.photos/seed/ch2/1600/900", caption: "Perspective study" },
    { thumb: "https://picsum.photos/seed/ch3/800/450", full: "https://picsum.photos/seed/ch3/1600/900", caption: "Color variants" },
  ];

  const copyMagic = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://creatorpass.one/demo?email=${encodeURIComponent(email)}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Topbar */}
      <div className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white" />
            <span className="font-semibold tracking-wide">CreatorsHub</span>
            <span className="text-neutral-400 text-sm ml-3">MVP Demo</span> <a href="/api/health" target="_blank" className="text-xs ml-3 underline text-neutral-400 hover:text-neutral-200">Health</a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang((l) => (l === "sv" ? "en" : "sv"))}
              className="text-sm px-3 py-1.5 rounded-full border border-neutral-700 hover:bg-neutral-800"
            >
              {lang === "sv" ? "EN" : "SV"}
            </button>
            <a
              href="#how"
              className="text-sm px-3 py-1.5 rounded-full border border-neutral-700 hover:bg-neutral-800"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              {t.heroTitle}
            </h1>
            <p className="text-neutral-300 mb-6 text-lg">{t.heroSub}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("checkout")}
                className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90"
              >
                {t.ctaPrimary}
              </button>
              <a
                href="#pack"
                className="px-5 py-3 rounded-2xl border border-neutral-700 hover:bg-neutral-900"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-3 gap-2">
              {demoImages.map((img, i) => (
                <img
                  key={i}
                  src={img.thumb}
                  alt={img.caption}
                  className="rounded-xl object-cover h-32 w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">{t.featuresTitle}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {t.features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-neutral-800 p-5">
              <p className="text-neutral-300">{f}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pack Card */}
      <section id="pack" className="max-w-6xl mx-auto px-4 py-10">
        <div className="rounded-3xl border border-neutral-800 p-6 md:p-10 bg-neutral-900/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.packTitle}</h3>
              <p className="text-neutral-400 mb-3">{t.includes}:</p>
              <ul className="list-disc list-inside text-neutral-300 space-y-1">
                {t.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <div className="rounded-2xl border border-neutral-800 p-5 text-center">
                <div className="text-neutral-400 text-sm">{t.price}</div>
                <div className="text-4xl font-extrabold my-2">{priceSEK}</div>
                <div className="text-xs text-neutral-500 mb-4">SEK · demo</div>
                <button
                  onClick={() => setStep("checkout")}
                  className="w-full px-5 py-3 rounded-xl bg-white text-neutral-900 font-semibold hover:opacity-90"
                >
                  {t.unlockNow}
                </button>
              </div>
            </div>
          </div>

          {/* Checkout (inline modal style) */}
          {step === "checkout" && (
            <div className="mt-8 rounded-2xl border border-neutral-800 p-6 bg-neutral-950">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{t.checkoutTitle}</h4>
                <button
                  onClick={() => setStep("landing")}
                  className="text-sm text-neutral-400 hover:text-neutral-200"
                >
                  {t.back}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">{t.emailLabel}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="namn@exempel.se"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <div className="mt-4 flex items-start gap-2">
                    <input
                      id="tos"
                      type="checkbox"
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                      className="mt-1"
                    />
                    <label htmlFor="tos" className="text-sm text-neutral-400">
                      {t.tosLabel}
                    </label>
                  </div>
                  <button
                    onClick={async () => {
                      const r = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                      });
                      const j = await r.json().catch(() => null);
                      if (j?.url) {
                        window.location.href = j.url;
                      } else {
                        alert("Checkout failed");
                      }
                    }}
                    disabled={!email || !agree}
                    className="mt-5 w-full px-5 py-3 rounded-xl bg-white text-neutral-900 font-semibold disabled:opacity-40"
                  >
                    {t.payBtn(priceSEK)}
                  </button>
                  <p className="text-xs text-neutral-500 mt-3">{lang === "sv" ? "Betalning sker i testläge via Stripe. Använd kort 4242 4242 4242 4242." : "Payment uses Stripe test mode. Use card 4242 4242 4242 4242."}</p>
                </div>
                <div>
                  <div className="rounded-xl border border-neutral-800 overflow-hidden">
                    <img src={demoImages[0].thumb} alt="preview" className="w-full h-56 object-cover" />
                  </div>
                  <p className="text-neutral-400 text-sm mt-3">
                    {lang === "sv"
                      ? "Efter betalning får du en magisk länk via e-post (eller ett CreatorPass i din wallet) för att låsa upp innehållet."
                      : "After payment you receive a magic link by email (or a CreatorPass in your wallet) to unlock the content."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Unlocked content */}
          {step === "unlocked" && (
            <div className="mt-8 rounded-2xl border border-neutral-800 p-6 bg-neutral-950">
              <h4 className="text-lg font-semibold mb-1">{t.unlockedTitle}</h4>
              <p className="text-neutral-400 mb-6">{t.unlockedSub}</p>

              <div className="grid md:grid-cols-3 gap-4">
                {demoImages.map((img, i) => (
                  <figure key={i} className="rounded-xl overflow-hidden border border-neutral-800">
                    <img src={img.full} alt={img.caption} className="w-full h-56 object-cover" />
                    <figcaption className="p-3 text-sm text-neutral-300">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-3">
                <a
                  href="/process-pack-demo.zip"
                  download
                  className="px-4 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-900 inline-block"
                >
                  {t.downloadAll}
                </a>
                <button
                  onClick={copyMagic}
                  className="px-4 py-3 rounded-xl bg-white text-neutral-900 font-semibold"
                >
                  {copied ? t.copied : t.copyLink}
                </button>
              </div>

              <p className="text-neutral-500 text-sm mt-4">{t.mintHint}</p>
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-4">{t.howTitle}</h3>
        <ol className="space-y-3">
          {t.howSteps.map((s, i) => (
            <li key={i} className="flex gap-3 items-start">
              <div className="w-7 h-7 rounded-full bg-white text-neutral-900 font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <p className="text-neutral-300">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-500 flex items-center justify-between">
          <span>{t.footer}</span>
          <span>v0</span>
        </div>
      </footer>
    </div>
  );
}


