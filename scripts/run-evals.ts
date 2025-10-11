// @ts-nocheck
/**
 * Minimal "mini-evals" runner för Creators Hub.
 * Läser en JSON-fil med testfall, kör OpenAI, mäter enkla "mustInclude"-checks
 * och skriver resultat till evals/results-YYYYMMDD-HHmmss.json
 */

const fs = require("fs");
const path = require("path");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  console.error("Saknar OPENAI_API_KEY i miljön.");
  process.exit(1);
}
const MODEL = process.env.CH_MODEL || "gpt-4o-mini";

function ts() {
  const d = new Date();
  const p = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
}

function readJson(file: string) {
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

function toArray<T>(x: T | T[] | undefined): T[] {
  if (!x) return [];
  return Array.isArray(x) ? x : [x];
}

function scoreMustInclude(text: string, must: string[]) {
  if (must.length === 0) return { score: 1, all: true, missing: [] as string[] };
  const lc = text.toLowerCase();
  const missing = must.filter((m) => !lc.includes(m.toLowerCase()));
  const score = 1 - missing.length / must.length;
  return { score, all: missing.length === 0, missing };
}

async function chat(prompt: string): Promise<{ content: string }> {
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: "Du är en hjälpsam assistent för Creators Hub. Svara kort och rakt." },
      { role: "user", content: prompt }
    ]
  };

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? "";
  return { content };
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: ts-node scripts/run-evals.ts <path-to-eval-json>");
    process.exit(1);
  }
  const abs = path.resolve(process.cwd(), file);
  if (!fs.existsSync(abs)) {
    console.error(`Hittar inte filen: ${abs}`);
    process.exit(1);
  }

  const suite = readJson(abs);
  let cases = toArray<any>(suite.cases);

  // Fallback: om eval-filen saknar "cases" → kör ett par enkla default
  if (!cases.length) {
    cases = [
      { id: "ping", prompt: "Svara exakt med ordet: pong", mustInclude: ["pong"] },
      { id: "title", prompt: "Skriv exakt: Creators Hub", mustInclude: ["Creators Hub"] },
    ];
    console.warn("⚠️  Inga 'cases' i eval-filen. Kör fallback-cases (2 st).");
  }

  const results: any[] = [];
  let passed = 0;
  const latencies: number[] = [];

  for (const c of cases) {
    const id = c.id || `case-${results.length+1}`;
    const prompt = c.prompt || "";
    const must = toArray<string>(c.mustInclude);

    const t0 = Date.now();
    let out = "", error = null;
    try {
      const r = await chat(prompt);
      out = r.content || "";
    } catch (e: any) {
      error = String(e?.message || e);
    }
    const t1 = Date.now();
    const latency_ms = t1 - t0;
    latencies.push(latency_ms);

    const { score, all, missing } = scoreMustInclude(out, must);
    if (all) passed++;

    results.push({
      id, prompt, mustInclude: must,
      output: out,
      includeScore: score,
      includeAll: all,
      missing,
      latency_ms,
      error
    });

    const mark = all && !error ? "✓" : "✗";
    console.log(`${mark} ${id}  score=${score.toFixed(2)}  t=${latency_ms}ms${missing.length?`  missing=${missing.join(",")}`:""}${error?`  ERROR=${error}`:""}`);
  }

  const avg = latencies.reduce((a,b)=>a+b,0) / Math.max(1, latencies.length);
  const avgInclude = results.reduce((a,r)=>a+(r.includeScore||0),0) / Math.max(1, results.length);

  const summary = {
    suite: suite.suite || path.basename(file, ".json"),
    model: MODEL,
    runAt: new Date().toISOString(),
    total: results.length,
    passed,
    pass_ratio: Number((passed / Math.max(1, results.length)).toFixed(3)),
    avg_latency_ms: Math.round(avg),
    avg_includeScore: Number(avgInclude.toFixed(3))
  };

  const outDir = path.resolve(process.cwd(), "evals");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `results-${ts()}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ summary, suiteMeta: { notes: suite.notes }, cases: results }, null, 2), "utf8");

  console.log("\n=== SUMMARY ===");
  console.log(summary);
  console.log(`\nResult sparat: ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

