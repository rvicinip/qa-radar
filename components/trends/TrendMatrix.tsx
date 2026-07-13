import type { Trend, TrendState } from "@/lib/types/content-types";
import { Badge } from "@/components/ui/Badge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";

const stateOrder: TrendState[] = ["Emerging", "Growing", "Mature", "Declining", "Hype-risk"];

const stateTone: Record<TrendState, "cyan" | "green" | "violet" | "slate" | "rose"> = {
  Emerging: "violet",
  Growing: "cyan",
  Mature: "green",
  Declining: "slate",
  "Hype-risk": "rose",
};

function impactTone(impact: Trend["impact"]) {
  if (impact === "Critical") return "rose";
  if (impact === "High") return "amber";
  if (impact === "Medium") return "cyan";
  return "slate";
}

export function TrendMatrix({ trends }: { trends: Array<Trend & { sourceNames?: string[] }> }) {
  return (
    <div className="trend-matrix">
      {stateOrder.map((state) => {
        const group = trends.filter((trend) => trend.state === state);
        if (group.length === 0) return null;

        return (
          <section key={state} className="trend-group">
            <div className="state-lbl">
              <Badge tone={stateTone[state]}>{state}</Badge>
              <span style={{ color: "var(--muted)" }}>{group.length} trends</span>
            </div>
            {group.map((trend) => (
              <TrendCard key={trend.id} trend={trend} sourceNames={trend.sourceNames} compact />
            ))}
          </section>
        );
      })}
    </div>
  );
}

export function TrendCard({
  trend,
  compact = false,
  sourceNames = trend.source_ids,
}: {
  trend: Trend;
  compact?: boolean;
  sourceNames?: string[];
}) {
  if (compact) {
    return (
      <article className="trend-item">
        <div className="name">{trend.name}</div>
        <div className="sum">{trend.summary}</div>
        <div className="tags">
          <Badge tone={impactTone(trend.impact)}>{trend.impact} impact</Badge>
          <Badge tone={stateTone[trend.state]}>{trend.state}</Badge>
          <ConfidenceBadge level={trend.confidence_level} />
          {trend.tags.map((tag) => (
            <Badge key={tag} tone="slate">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="surface-card">
      <div className="name" style={{ fontSize: "0.92rem" }}>
        {trend.name}
      </div>
      <div className="sum" style={{ marginTop: "4px" }}>
        {trend.summary}
      </div>
      <div className="tags">
        <Badge tone={impactTone(trend.impact)}>{trend.impact} impact</Badge>
        <Badge tone={stateTone[trend.state]}>{trend.state}</Badge>
        <ConfidenceBadge level={trend.confidence_level} />
        {trend.tags.map((tag) => (
          <Badge key={tag} tone="slate">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="sum" style={{ marginTop: "12px" }}>
        <span style={{ fontWeight: 600, color: "var(--ink)" }}>Applicability:</span>{" "}
        {trend.applicability.join(", ")}
      </p>
      <SourceCitation sourceUrl={trend.source_url} sourceNames={sourceNames} reviewedAt={trend.reviewed_at} />
    </article>
  );
}
