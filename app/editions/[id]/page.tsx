import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import {
  getEditions,
  getEditionMeta,
  getTrends,
  getNews,
  getSignals,
  getStandards,
  getEcosystem,
} from "@/lib/data/loader";
import { EcosystemSection } from "@/components/editions/EcosystemSection";

export function generateStaticParams() {
  return getEditions().map((e) => ({ id: e.id }));
}

export default async function EditionCoverPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const known = getEditions().some((e) => e.id === id);
  if (!known) notFound();
  const meta = getEditionMeta(id);

  const trends = getTrends(id).slice(0, 5);
  const news = getNews(id).slice(0, 5);
  const signals = getSignals(id).slice(0, 5);
  const standards = getStandards(id).slice(0, 5);
  const ecosystem = getEcosystem(id);

  return (
    <AppShell title={meta.label} tagline={`QA Radar edition — published ${meta.published}`}>
      <section aria-label="Month highlights" style={{ display: "grid", gap: "var(--space-4)" }}>
        <div className="card">
          <h2>Top trends</h2>
          <ul>{trends.map((t) => <li key={t.id}>{t.name} — {t.state}</li>)}</ul>
        </div>
        <div className="card">
          <h2>Top news</h2>
          <ul>{news.map((n) => <li key={n.id}>{n.title}</li>)}</ul>
        </div>
        <div className="card">
          <h2>Signals</h2>
          <ul>{signals.map((s) => <li key={s.id}>{s.title}</li>)}</ul>
        </div>
        <div className="card">
          <h2>Standards</h2>
          <ul>{standards.map((s) => <li key={s.id}>{s.name}</li>)}</ul>
        </div>
        <EcosystemSection items={ecosystem} />
      </section>
    </AppShell>
  );
}
