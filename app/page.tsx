import Link from 'next/link';

export default function Page() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Hej CreatorsHub Global</h1>
      <p>Den här sidan har inga onClick-handlers.</p>
      <Link href="/next" className="underline">Gå vidare till /next</Link>
    </main>
  );
}
