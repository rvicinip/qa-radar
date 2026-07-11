import { test } from "node:test";
import assert from "node:assert/strict";
import { diffEditions, type EditionSnapshot } from "./diff";

function snap(over: Partial<EditionSnapshot>): EditionSnapshot {
  return {
    id: "2026-06",
    trends: [],
    news: [],
    tools: [],
    signals: [],
    standards: [],
    ecosystem: [],
    ...over,
  };
}

test("launches: item present in `to` but absent in `from`", () => {
  const from = snap({ id: "2026-06", news: [] });
  const to = snap({ id: "2026-07", news: [{ id: "n1", title: "New article" }] });
  const d = diffEditions(from, to);
  assert.equal(d.launches.length, 1);
  assert.equal(d.launches[0].id, "n1");
  assert.equal(d.launches[0].kind, "news");
});

test("removals: item present in `from` but absent in `to`", () => {
  const from = snap({ tools: [{ id: "t1", title: "Old tool" }] });
  const to = snap({ id: "2026-07", tools: [] });
  const d = diffEditions(from, to);
  assert.equal(d.removals.length, 1);
  assert.equal(d.removals[0].id, "t1");
});

test("trendStateChanges: same id, changed state", () => {
  const from = snap({ trends: [{ id: "tr1", title: "AI QA", state: "Emerging" }] });
  const to = snap({
    id: "2026-07",
    trends: [{ id: "tr1", title: "AI QA", state: "Growing" }],
  });
  const d = diffEditions(from, to);
  assert.equal(d.trendStateChanges.length, 1);
  assert.deepEqual(d.trendStateChanges[0], {
    id: "tr1",
    name: "AI QA",
    from: "Emerging",
    to: "Growing",
  });
});

test("ecosystem moves: added, promoted, done", () => {
  const from = snap({
    ecosystem: [{ id: "e1", status: "proposed" }, { id: "e2", status: "proposed" }],
  });
  const to = snap({
    id: "2026-07",
    ecosystem: [
      { id: "e1", status: "promoted" },
      { id: "e2", status: "done" },
      { id: "e3", status: "proposed" },
    ],
  });
  const d = diffEditions(from, to);
  assert.deepEqual(d.ecosystem.added.map((i) => i.id), ["e3"]);
  assert.deepEqual(d.ecosystem.promoted.map((i) => i.id), ["e1"]);
  assert.deepEqual(d.ecosystem.done.map((i) => i.id), ["e2"]);
});
