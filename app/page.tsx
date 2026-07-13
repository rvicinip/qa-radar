import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { TrendMatrix } from "@/components/trends/TrendMatrix";
import { StandardsPreview } from "@/components/standards/StandardsPreview";
import { Badge } from "@/components/ui/Badge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import {
  getBestPractices,
  getCommunities,
  getLastUpdatedDate,
  getNews,
  getSignals,
  getSources,
  getStandards,
  getTools,
  getTrends,
} from "@/lib/data/loader";
import { YourPrioritiesStrip } from "@/components/salience/YourPrioritiesStrip";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function HomePage() {
  const lastUpdated = getLastUpdatedDate();
  const sourceMap = buildSourceNameMap(getSources());
  const signals = getSignals();
  const trends = withSourceNames(getTrends(), sourceMap);
  const news = getNews();
  const communities = getCommunities();
  const tools = getTools();
  const practices = getBestPractices();
  const standards = getStandards();

  const activeTrends = trends.filter((trend) => trend.status === "active" || trend.status === "watching");
  const growingCount = activeTrends.filter((t) => t.state === "Growing").length;
  const matureCount = activeTrends.filter((t) => t.state === "Mature").length;

  const featuredNews = news[0];
  const featuredCommunity = communities[0];
  const featuredTool = tools[0];
  const featuredPractice = practices[0];

  return (
    <AppShell
      title="QA Radar"
      tagline="Professional QA intelligence — Resources, Trends, Best Practices & Professional Communities"
    >
      <header className="hero-panel">
        <h2>Your evidence-based QA intelligence dashboard</h2>
        <p className="sub">
          Curated signals, trends, communities and practices — each item backed by a source, review date and
          confidence level.
        </p>
        <div className="hero-meta">
          <span className="hero-chip">📅 Last updated · {lastUpdated}</span>
          <span className="hero-chip">🟢 Radar status · Active</span>
          <span className="hero-chip">
            ⚖ Standards coverage · {standards.length > 0 ? `${standards.length} frameworks` : "loading…"}
          </span>
          <span className="hero-chip">
            🔍 {signals.length} signal · {trends.length} trends · seed data
          </span>
        </div>
      </header>

      <YourPrioritiesStrip />

      <StandardsPreview standards={standards} />

      <div className="status-row" aria-label="Radar status summary">
        <div className="stat-card">
          <div className="lbl">Signals this month</div>
          <div className="val">{signals.length}</div>
          <div className="sub">
            From <code>signals.json</code>
          </div>
        </div>
        <div className="stat-card">
          <div className="lbl">Active trends</div>
          <div className="val">{activeTrends.length}</div>
          <div className="sub">
            {growingCount} Growing · {matureCount} Mature
          </div>
        </div>
        <div className="stat-card">
          <div className="lbl">Standards tracked</div>
          <div className="val">{standards.length > 0 ? standards.length : "—"}</div>
          <div className="sub">
            <Link href="/standards" className="no-underline hover:underline" style={{ color: "var(--muted)" }}>
              International frameworks index →
            </Link>
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="signal-board-heading">
        <div className="section-head">
          <h3 id="signal-board-heading">
            📋 Signal Board <Badge tone="cyan">7 columns</Badge>
          </h3>
          <Link href="/signal-board" className="hint no-underline hover:underline">
            Full board at /signal-board →
          </Link>
        </div>
        <KanbanBoard signals={signals} compact sourceNameMap={sourceMap} />
      </section>

      <section className="section" aria-labelledby="trends-heading">
        <div className="section-head">
          <h3 id="trends-heading">
            ↗ Trends snapshot <Badge tone="violet">State matrix</Badge>
          </h3>
          <span className="hint">
            From <code>trends.json</code> · not a 4-ring radar
          </span>
        </div>
        <TrendMatrix trends={activeTrends} />
      </section>

      <section className="section" aria-labelledby="previews-heading">
        <div className="section-head">
          <h3 id="previews-heading">Featured previews</h3>
          <span className="hint">Home dashboard cards · Phase-1 routes</span>
        </div>
        <div className="preview-grid">
          {featuredNews ? (
            <article className="preview">
              <div className="ptype">News</div>
              <h4>{featuredNews.title}</h4>
              <p>{featuredNews.summary}</p>
              <div className="foot">
                <ConfidenceBadge level={featuredNews.confidence_level} />
                <Badge tone="slate">{featuredNews.published_at}</Badge>
              </div>
            </article>
          ) : null}
          {featuredCommunity ? (
            <article className="preview">
              <div className="ptype">Community</div>
              <h4>{featuredCommunity.name}</h4>
              <p>{featuredCommunity.summary}</p>
              <div className="foot">
                <Badge tone="cyan">{featuredCommunity.update_frequency}</Badge>
                <Badge tone="slate">{featuredCommunity.region}</Badge>
              </div>
            </article>
          ) : null}
          {featuredTool ? (
            <article className="preview">
              <div className="ptype">Tool</div>
              <h4>{featuredTool.name}</h4>
              <p>{featuredTool.summary}</p>
              <div className="foot">
                <Badge tone="green">{featuredTool.maturity}</Badge>
                <Badge tone="slate">{featuredTool.category}</Badge>
              </div>
            </article>
          ) : null}
          {featuredPractice ? (
            <article className="preview">
              <div className="ptype">Best practice</div>
              <h4>{featuredPractice.name}</h4>
              <p>{featuredPractice.summary}</p>
              <div className="foot">
                <ConfidenceBadge level={featuredPractice.confidence_level} />
                <Badge tone="slate">{featuredPractice.category}</Badge>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="section" aria-labelledby="digest-heading">
        <div className="section-head">
          <h3 id="digest-heading">Newsletter / Digest preview</h3>
        </div>
        <p className="sum" style={{ marginBottom: "var(--space-3)" }}>
          Monthly digest placeholder — top signals and trends for QA professionals (static preview in Phase 1).
        </p>
        <div className="preview">
          <p style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>This month&apos;s highlights</p>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.84rem", color: "var(--ink-secondary)" }}>
            {signals.slice(0, 3).map((signal) => (
              <li key={signal.id} style={{ marginBottom: "4px" }}>
                {signal.title}
              </li>
            ))}
            {trends.slice(0, 2).map((trend) => (
              <li key={trend.id} style={{ marginBottom: "4px" }}>
                {trend.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
