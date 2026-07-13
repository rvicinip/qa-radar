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
import { Badge } from "@/components/ui/Badge";
import type { TrendState, StandardCategory } from "@/lib/types/content-types";

const STATE_TONE: Record<TrendState, "violet" | "cyan" | "green" | "slate" | "rose"> = {
  Emerging: "violet",
  Growing: "cyan",
  Mature: "green",
  Declining: "slate",
  "Hype-risk": "rose",
};

const CATEGORY_TONE: Record<StandardCategory, "violet" | "cyan" | "green" | "slate"> = {
  governance: "violet",
  testing: "cyan",
  security: "green",
  accessibility: "slate",
  "ai-codegen": "violet",
};

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
      <section className="section">
        <div className="section-head">
          <h3>Top trends</h3>
        </div>
        <div className="preview-grid">
          {trends.map((t) => (
            <article key={t.id} className="preview">
              <h4>{t.name}</h4>
              <p className="text-[var(--ink-secondary)]" style={{ fontSize: ".84rem" }}>
                {t.summary}
              </p>
              <div className="foot">
                <Badge tone={STATE_TONE[t.state]}>{t.state}</Badge>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h3>Top news</h3>
        </div>
        <div className="preview-grid">
          {news.map((n) => (
            <article key={n.id} className="preview">
              <div className="ptype">{n.source_name} · {n.published_at}</div>
              <h4>{n.title}</h4>
              <p className="text-[var(--ink-secondary)]" style={{ fontSize: ".84rem" }}>
                {n.summary}
              </p>
              <div className="foot">
                <Badge tone="blue">{n.impact_category}</Badge>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h3>Signals</h3>
        </div>
        <div className="preview-grid">
          {signals.map((s) => (
            <article key={s.id} className="preview">
              <div className="ptype">{s.source_name}</div>
              <h4>{s.title}</h4>
              <p className="text-[var(--ink-secondary)]" style={{ fontSize: ".84rem" }}>
                {s.summary}
              </p>
              <div className="foot">
                <Badge tone={s.impact === "Critical" ? "rose" : s.impact === "High" ? "amber" : s.impact === "Medium" ? "cyan" : "slate"}>
                  {s.board_state}
                </Badge>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h3>Standards</h3>
        </div>
        <div className="preview-grid">
          {standards.map((s) => (
            <article key={s.id} className="preview">
              <div className="ptype">{s.publisher}</div>
              <h4>{s.name}</h4>
              <p className="text-[var(--ink-secondary)]" style={{ fontSize: ".84rem" }}>
                {s.qa_relevance}
              </p>
              <div className="foot">
                <Badge tone={CATEGORY_TONE[s.category]}>{s.category}</Badge>
              </div>
            </article>
          ))}
        </div>
      </section>

      <EcosystemSection items={ecosystem} />
    </AppShell>
  );
}
