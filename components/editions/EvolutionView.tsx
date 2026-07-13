import type { TrendState } from "@/lib/types/content-types";
import type { EditionDiff } from "@/lib/evolution/diff";
import { Badge } from "@/components/ui/Badge";

const STATE_TONE: Record<TrendState, "violet" | "cyan" | "green" | "slate" | "rose"> = {
  Emerging: "violet",
  Growing: "cyan",
  Mature: "green",
  Declining: "slate",
  "Hype-risk": "rose",
};

const KIND_TONE: Record<string, "violet" | "blue" | "cyan" | "amber" | "green" | "slate"> = {
  trends: "violet",
  news: "blue",
  tools: "cyan",
  signals: "amber",
  standards: "green",
};

export function EvolutionView({ diff }: { diff: EditionDiff }) {
  return (
    <div>
      <section className="section">
        <div className="section-head">
          <h3>New this month ({diff.launches.length})</h3>
        </div>
        {diff.launches.length === 0 ? (
          <p className="text-[var(--muted)]">No new items this month.</p>
        ) : (
          <div className="preview-grid">
            {diff.launches.map((i) => (
              <article key={`${i.kind}-${i.id}`} className="preview">
                <div className="ptype">
                  <Badge tone={KIND_TONE[i.kind] ?? "slate"}>{i.kind}</Badge>
                </div>
                <h4>{i.title}</h4>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h3>Retired ({diff.removals.length})</h3>
        </div>
        {diff.removals.length === 0 ? (
          <p className="text-[var(--muted)]">No items retired this month.</p>
        ) : (
          <div className="preview-grid">
            {diff.removals.map((i) => (
              <article key={`${i.kind}-${i.id}`} className="preview">
                <div className="ptype">
                  <Badge tone={KIND_TONE[i.kind] ?? "slate"}>{i.kind}</Badge>
                </div>
                <h4>{i.title}</h4>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h3>Trend shifts ({diff.trendStateChanges.length})</h3>
        </div>
        {diff.trendStateChanges.length === 0 ? (
          <p className="text-[var(--muted)]">No trend state shifts this month.</p>
        ) : (
          <div className="preview-grid">
            {diff.trendStateChanges.map((c) => (
              <article key={c.id} className="preview">
                <h4>{c.name}</h4>
                <div className="foot">
                  <Badge tone={STATE_TONE[c.from]}>{c.from}</Badge>
                  <span className="text-[var(--muted)]" style={{ margin: "0 var(--space-1)" }}>
                    →
                  </span>
                  <Badge tone={STATE_TONE[c.to]}>{c.to}</Badge>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <h3>Ecosystem moves</h3>
        </div>
        <p>
          <span className="badge cyan">{diff.ecosystem.added.length} added</span>
          {" "}
          <span className="badge blue">{diff.ecosystem.promoted.length} promoted</span>
          {" "}
          <span className="badge green">{diff.ecosystem.done.length} done</span>
        </p>
      </section>
    </div>
  );
}
