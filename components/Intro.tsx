import React from "react";

const Intro = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Här slutar du skapa för algoritmen.
          <br />
          Här börjar du skapa för de som följer dig på riktigt.
        </h1>

        <p className="text-xl md:text-2xl text-neutral-200 mb-3">
          En liten backstage-plats för dig och de som följer ditt skapande på riktigt.
        </p>

        <p className="text-sm md:text-base text-neutral-400 mb-2">
          Det du lägger på Instagram är scenen.
        </p>
        <p className="text-sm md:text-base text-neutral-400 mb-6">
          CreatorsHub är din backstage-loge – ett komplement till sociala medier, inte en ersättare.
        </p>

        <div className="flex flex-col items-center justify-center gap-3">
          <a
            href="/creator"
            className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90"
          >
            Jag är kreatör
          </a>
        </div>

        <p className="mt-4 text-sm text-neutral-400">
          Vill du se hur det kan se ut för dem som följer dig på riktigt först?{" "}
          <a href="/fan" className="underline hover:text-white">
            Se exempel (visningsläge)
          </a>
        </p>

        <p className="mt-4 text-xs md:text-sm text-neutral-500 italic">
          Create For The Few. Äg din konst. Äg din publik. Äg din resa.
        </p>
      </div>

      {/* NÄR ANVÄNDER DU VAD? */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          När använder du vad?
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Patreon */}
          <div className="border border-neutral-700 rounded-2xl p-6 bg-neutral-900/40">
            <div className="text-sm uppercase tracking-wide text-neutral-400 mb-2">
              Patreon
            </div>
            <div className="font-semibold mb-2">Löpande medlemsklubb</div>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>· Månadsbetalning</li>
              <li>· Extra content i en feed</li>
              <li>· Bra när du vill bygga en klubb</li>
            </ul>
          </div>

          {/* Ko-fi */}
          <div className="border border-neutral-700 rounded-2xl p-6 bg-neutral-900/40">
            <div className="text-sm uppercase tracking-wide text-neutral-400 mb-2">
              Ko-fi
            </div>
            <div className="font-semibold mb-2">Digital dricksburk</div>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>· Engångs-”tack för jobbet”</li>
              <li>· Knappar under inlägg</li>
              <li>· Bra när folk bara vill stötta spontant</li>
            </ul>
          </div>

          {/* CreatorsHub */}
          <div className="border border-neutral-700 rounded-2xl p-6 bg-neutral-900/40">
            <div className="text-sm uppercase tracking-wide text-neutral-400 mb-2">
              CreatorsHub
            </div>
            <div className="font-semibold mb-2">Små backstage-släpp</div>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>· 2–3 gånger per år</li>
              <li>· Backstage-paket med ex process, bilder, skisser och halvfärdiga grejor. </li>
              <li>· Du väljer vad du vill visa. För de som följer ditt skapande på riktigt</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FOOTER – vem står bakom */}
      <footer className="border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6 py-6 text-sm text-neutral-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>CreatorsHub · byggt i Stockholm</div>
          <div>
            Ansvarig: <span className="font-medium">James Mehks</span> ·{" "}
            <a href="mailto:james@creatorshub.global">
              james@creatorshub.global
            </a>{" "}
            ·{" "}
            <a
              href="https://www.instagram.com/creatorshub.global"
              target="_blank"
              rel="noreferrer"
            >
              Instagram: @creatorshub.global
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Intro;


