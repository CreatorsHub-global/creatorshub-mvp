import React from "react";

const Intro = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          CreatorsHub – för riktiga fans
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 mb-8">
          Små backstage-paket med bilder, skisser och process – för fans som vill se hur dina bilder faktiskt blir till.
        </p>


                <p className="text-sm md:text-base text-neutral-500 mb-8">
          Det du lägger på Instagram är torget. CreatorsHub är din studio backstage.
        </p>


      <div className="flex flex-col items-center justify-center gap-3">
  <button
    className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90"
    onClick={() => { window.location.href = "/creator"; }}
  >
    Jag är kreatör
  </button>
</div>

<p className="mt-4 text-sm text-neutral-400">
  Vill du se hur det kan se ut för dina fans först?{" "}
  <button
    className="underline hover:text-white"
  onClick={() => { window.location.href = "/fan"; }}
  >
    Se exempel (fansens vy)
  </button>
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
            <div className="font-semibold mb-2">Små backstage-drops</div>
            <ul className="text-sm text-neutral-300 space-y-1">
              <li>· 2–3 gånger per år</li>
              <li>· Backstage-paket med bilder, skisser, process</li>
              <li>· För 10–100 riktiga fans</li>
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
};

export default Intro;
