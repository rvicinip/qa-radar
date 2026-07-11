import { AppShell } from "@/components/layout/AppShell";
import { EvolutionView } from "@/components/editions/EvolutionView";
import {
  getEditions,
  getCurrentEditionId,
  getTrends,
  getNews,
  getTools,
  getSignals,
  getStandards,
  getEcosystem,
} from "@/lib/data/loader";
import { diffEditions, type EditionSnapshot } from "@/lib/evolution/diff";

function snapshot(id: string): EditionSnapshot {
  return {
    id,
    trends: getTrends(id).map((t) => ({ id: t.id, title: t.name, state: t.state })),
    news: getNews(id).map((n) => ({ id: n.id, title: n.title })),
    tools: getTools(id).map((t) => ({ id: t.id, title: t.name })),
    signals: getSignals(id).map((s) => ({ id: s.id, title: s.title })),
    standards: getStandards(id).map((s) => ({ id: s.id, title: s.name })),
    ecosystem: getEcosystem(id).map((e) => ({ id: e.id, status: e.status })),
  };
}

export default function EvolutionPage() {
  const current = getCurrentEditionId();
  const sorted = [...getEditions()].sort((a, b) => a.id.localeCompare(b.id));
  const idx = sorted.findIndex((e) => e.id === current);
  const previous = idx > 0 ? sorted[idx - 1].id : null;

  if (!previous) {
    return (
      <AppShell title="Evolution" tagline="Month-over-month changes">
        <div className="card">
          <p>Only one edition exists so far. Evolution appears once a second edition is published.</p>
        </div>
      </AppShell>
    );
  }

  const diff = diffEditions(snapshot(previous), snapshot(current));

  return (
    <AppShell title="Evolution" tagline={`Changes from ${previous} to ${current}`}>
      <EvolutionView diff={diff} />
    </AppShell>
  );
}
