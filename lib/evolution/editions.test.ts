import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getTrends,
  getNews,
  getTools,
  getSignals,
  getStandards,
  getEcosystem,
  getEditions,
  getCurrentEditionId,
} from "../data/loader";

const CANONICAL_STANDARD_IDS = [
  "iso-42001",
  "iso-29119",
  "nist-ai-rmf",
  "eu-ai-act",
  "owasp-llm-top10",
  "wcag-22",
  "oecd-ai-principles",
];

test("editions manifest has 2026-06 and 2026-07", () => {
  const editions = getEditions();
  assert.equal(editions.length, 2);
  const ids = editions.map((e) => e.id);
  assert.ok(ids.includes("2026-06"));
  assert.ok(ids.includes("2026-07"));
  assert.equal(getCurrentEditionId(), "2026-07");
});

test("June 2026 — frozen snapshot", () => {
  const trends = getTrends("2026-06");
  const news = getNews("2026-06");
  const tools = getTools("2026-06");
  const signals = getSignals("2026-06");
  const standards = getStandards("2026-06");
  const ecosystem = getEcosystem("2026-06");

  // counts
  assert.equal(trends.length, 24, "24 trends");
  assert.equal(news.length, 19, "19 news");
  assert.ok(tools.length >= 12, `tools >= 12 (got ${tools.length})`);
  assert.ok(signals.length >= 8, `signals >= 8 (got ${signals.length})`);
  assert.equal(standards.length, 15, "15 standards");

  // no ecosystem.json for June (feature didn't exist yet)
  assert.equal(ecosystem.length, 0, "June has no ecosystem recommendations");

  // key data point: AI-assisted testing was Growing in June
  const aiTrend = trends.find((t) => t.id === "ai-assisted-testing");
  assert.ok(aiTrend, "AI-assisted testing trend exists");
  assert.equal(aiTrend.state, "Growing", "June: AI-assisted testing = Growing");

  // canonical standards all present
  const stdIds = new Set(standards.map((s) => s.id));
  for (const id of CANONICAL_STANDARD_IDS) {
    assert.ok(stdIds.has(id), `June missing standard: ${id}`);
  }

  // salience minimums
  assert.ok(trends.length >= 15, "trends >= 15");
  assert.ok(news.length >= 12, "news >= 12");
  assert.ok(signals.length >= 8, "signals >= 8");
  assert.ok(standards.length >= 12, "standards >= 12");
});

test("July 2026 — curated edition", () => {
  const trends = getTrends("2026-07");
  const news = getNews("2026-07");
  const tools = getTools("2026-07");
  const signals = getSignals("2026-07");
  const standards = getStandards("2026-07");
  const ecosystem = getEcosystem("2026-07");

  // counts (June base + additions)
  assert.equal(trends.length, 24, "24 trends");
  assert.equal(news.length, 21, "21 news (19 + 2 new)");
  assert.equal(tools.length, 13, "13 tools (12 + 1 new)");
  assert.ok(signals.length >= 8, `signals >= 8 (got ${signals.length})`);
  assert.equal(standards.length, 15, "15 standards");

  // July has ecosystem recommendations
  assert.ok(ecosystem.length >= 3, `ecosystem items >= 3 (got ${ecosystem.length})`);

  // key data point: AI-assisted testing matured to Mature
  const aiTrend = trends.find((t) => t.id === "ai-assisted-testing");
  assert.ok(aiTrend, "AI-assisted testing trend exists");
  assert.equal(aiTrend.state, "Mature", "July: AI-assisted testing = Mature");

  // new items specific to July
  assert.ok(news.some((n) => n.id === "playwright-1-53-release"), "new Playwright news present");
  assert.ok(tools.some((t) => t.id === "trace-viewer-plus"), "new Trace Viewer tool present");

  // canonical standards all present
  const stdIds = new Set(standards.map((s) => s.id));
  for (const id of CANONICAL_STANDARD_IDS) {
    assert.ok(stdIds.has(id), `July missing standard: ${id}`);
  }

  // salience minimums
  assert.ok(trends.length >= 15, "trends >= 15");
  assert.ok(news.length >= 12, "news >= 12");
  assert.ok(signals.length >= 8, "signals >= 8");
  assert.ok(standards.length >= 12, "standards >= 12");

  // ecosystem verdicts are valid
  const validVerdicts = new Set(["adopt", "trial", "watch", "not-applicable"]);
  for (const item of ecosystem) {
    assert.ok(validVerdicts.has(item.verdict), `invalid verdict: ${item.verdict}`);
    assert.ok(["ai-ops", "iq-qa"].includes(item.target), `invalid target: ${item.target}`);
    assert.ok(["proposed", "promoted", "done", "dropped"].includes(item.status), `invalid status: ${item.status}`);
    assert.ok(item.source_ref.length > 0, "empty source_ref");
  }
});

test("June and July are different where curated", () => {
  const juneNewsIds = new Set(getNews("2026-06").map((n) => n.id));
  const julyNewsIds = new Set(getNews("2026-07").map((n) => n.id));
  const juneToolIds = new Set(getTools("2026-06").map((t) => t.id));
  const julyToolIds = new Set(getTools("2026-07").map((t) => t.id));

  assert.ok(julyNewsIds.has("playwright-1-53-release") && !juneNewsIds.has("playwright-1-53-release"),
    "new July news not in June");
  assert.ok(julyToolIds.has("trace-viewer-plus") && !juneToolIds.has("trace-viewer-plus"),
    "new July tool not in June");

  const juneAiState = getTrends("2026-06").find((t) => t.id === "ai-assisted-testing")!.state;
  const julyAiState = getTrends("2026-07").find((t) => t.id === "ai-assisted-testing")!.state;
  assert.notEqual(juneAiState, julyAiState, "trend state differs between editions");
  assert.equal(juneAiState, "Growing");
  assert.equal(julyAiState, "Mature");
});

test("identical files are truly identical between editions", () => {
  const juneStandards = JSON.stringify(getStandards("2026-06"));
  const julyStandards = JSON.stringify(getStandards("2026-07"));
  assert.equal(juneStandards, julyStandards, "standards identical");

  const juneSignals = JSON.stringify(getSignals("2026-06"));
  const julySignals = JSON.stringify(getSignals("2026-07"));
  assert.equal(juneSignals, julySignals, "signals identical");
});
