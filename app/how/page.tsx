export default function HowPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-4 py-16">
      <section className="max-w-2xl w-full space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
            Förklarat på ren svenska
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Så funkar CreatorsHub
          </h1>
        </header>

        <div className="space-y-4 text-neutral-200">
          <p>
            Ibland händer något litet som betyder mycket: en kommentar från någon du ser upp till,
            ett svar på ett DM, ett litet tecken på att du blivit sedd.
          </p>

          <p className="font-semibold">
            CreatorsHub handlar om att ge den känslan till dina egna fans – på ett enkelt sätt.
          </p>

          <p>
            I stället för att starta en klubb eller prenumeration gör du ibland ett litet backstage-släpp
            för de 10–100 personer som verkligen bryr sig om ditt arbete.
          </p>
        </div>

        <ol className="list-decimal list-inside space-y-3 text-neutral-100 text-sm md:text-base">
          <li>
            <span className="font-semibold">Du väljer ett litet paket</span> – till exempel skisser, utkast,
            extra rutor eller en kort text om din process.
          </li>
          <li>
            <span className="font-semibold">Vi sätter upp en enkel sida</span> där dina fans kan låsa upp
            paketet för en liten engångssumma – utan krångel, utan mellanhänder.
          </li>
          <li>
            <span className="font-semibold">De som verkligen bryr sig får en speciell digital access</span> – och du ser
            vilka de är.
          </li>
        </ol>
      </section>
    </main>
  );
}
