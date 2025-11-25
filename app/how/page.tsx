import React from "react";

export default function HowPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-xl w-full px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Så här funkar CreatorsHub (enkelt)
        </h1>

        <p className="text-lg text-neutral-300 mb-6">
          Tanken är enkel: du har ett verk eller en liten serie som betyder
          extra mycket. Vi hjälper dig att dela det digitalt med dina riktiga
          fans – utan krångel, utan mellanhänder.
        </p>

        <ol className="text-left text-neutral-200 space-y-3 mb-8">
          <li>1. Du beskriver ditt verk och vad som ingår.</li>
          <li>2. Vi sätter upp en enkel sida där dina fans kan få tillgång.</li>
          <li>3. De som verkligen bryr sig får en speciell digital access – och du vet vilka de är.</li>
        </ol>

        <a
          href="/"
          className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90 inline-block"
        >
          Tillbaka till startsidan
        </a>
      </div>
    </div>
  );
}
