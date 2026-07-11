import type { EditionDiff } from "@/lib/evolution/diff";

export function EvolutionView({ diff }: { diff: EditionDiff }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-4)" }}>
      <div className="card">
        <h2>New this month ({diff.launches.length})</h2>
        <ul>{diff.launches.map((i) => <li key={`${i.kind}-${i.id}`}>[{i.kind}] {i.title}</li>)}</ul>
      </div>
      <div className="card">
        <h2>Retired ({diff.removals.length})</h2>
        <ul>{diff.removals.map((i) => <li key={`${i.kind}-${i.id}`}>[{i.kind}] {i.title}</li>)}</ul>
      </div>
      <div className="card">
        <h2>Trend shifts ({diff.trendStateChanges.length})</h2>
        <ul>{diff.trendStateChanges.map((c) => <li key={c.id}>{c.name}: {c.from} → {c.to}</li>)}</ul>
      </div>
      <div className="card">
        <h2>Ecosystem moves</h2>
        <p>Added {diff.ecosystem.added.length} · Promoted {diff.ecosystem.promoted.length} · Done {diff.ecosystem.done.length}</p>
      </div>
    </div>
  );
}
