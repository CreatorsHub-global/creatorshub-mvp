// @ts-nocheck
const fs = require("fs");
const path = require("path");

function latestResult() {
  const dir = path.resolve(process.cwd(), "evals");
  const files = fs.readdirSync(dir)
    .filter(f => /^results-.*\.json$/.test(f))
    .map(f => ({ f, t: fs.statSync(path.join(dir, f)).mtimeMs }))
    .sort((a,b) => b.t - a.t);
  if (!files.length) throw new Error("Hittar inga results-*.json i evals/");
  const p = path.join(dir, files[0].f);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function num(v, d) { const n = parseFloat(String(v)); return Number.isFinite(n) ? n : d; }

(async () => {
  const data = latestResult();
  const s = data.summary || {};
  const passRatio = num(s.pass_ratio, 0);
  const avgInc    = num(s.avg_includeScore, 0);
  const avgLat    = num(s.avg_latency_ms, 1e9);

  // Trösklar (kan override: PASS_MIN, INCLUDE_MIN, LATENCY_MAX)
  const PASS_MIN    = num(process.env.PASS_MIN,    0.70);
  const INCLUDE_MIN = num(process.env.INCLUDE_MIN, 0.85);
  const LATENCY_MAX = num(process.env.LATENCY_MAX, 6000);

  console.log("=== GATE INPUT ===");
  console.log({ passRatio, avgInc, avgLat, PASS_MIN, INCLUDE_MIN, LATENCY_MAX });

  const fails = [];
  if (passRatio < PASS_MIN)   fails.push(`pass_ratio ${passRatio} < ${PASS_MIN}`);
  if (avgInc    < INCLUDE_MIN) fails.push(`avg_includeScore ${avgInc} < ${INCLUDE_MIN}`);
  if (avgLat    > LATENCY_MAX) fails.push(`avg_latency_ms ${avgLat} > ${LATENCY_MAX}`);

  if (fails.length) {
    console.error("❌ Evals gate FAILED:", fails.join(" | "));
    process.exit(2);
  } else {
    console.log("✅ Evals gate PASSED");
  }
})();

