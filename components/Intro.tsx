import React from "react";

const Intro = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="max-w-3xl w-full px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          CreatorsHub – för riktiga fans
        </h1>

        <p className="text-lg md:text-xl text-neutral-300 mb-8">
          Här kan du som illustratör eller serietecknare dela ett speciellt verk
          med de följare som verkligen bryr sig – på ett enkelt sätt.
          Inga mellanhänder, bara du och din publik.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-semibold hover:opacity-90"
            onClick={() => { window.location.href = "/creator"; }}
          >
            Jag är kreatör
          </button>
          <button className="px-5 py-3 rounded-2xl border border-neutral-600 text-neutral-100 hover:bg-neutral-900"
  onClick={() => { window.location.href = "/how"; }}
>
  Visa mig hur
</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
