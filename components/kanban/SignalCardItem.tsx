import type { SignalCard } from "@/lib/types/content-types";
import { Badge } from "@/components/ui/Badge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";

function impactTone(impact: SignalCard["impact"]) {
  if (impact === "Critical") return "rose";
  if (impact === "High") return "amber";
  if (impact === "Medium") return "cyan";
  return "slate";
}

function urgencyTone(urgency: SignalCard["urgency"]) {
  if (urgency === "High") return "amber";
  if (urgency === "Medium") return "cyan";
  return "slate";
}

export function SignalCardItem({
  signal,
  compact = false,
  sourceNames = signal.source_ids,
}: {
  signal: SignalCard;
  compact?: boolean;
  sourceNames?: string[];
}) {
  return (
    <article className="signal-card">
      <div className="title">{signal.title}</div>
      <p>{signal.summary}</p>
      <div className="meta">
        <Badge tone={impactTone(signal.impact)}>{signal.impact}</Badge>
        <Badge tone={urgencyTone(signal.urgency)}>{signal.urgency} urgency</Badge>
        <ConfidenceBadge level={signal.confidence_level} />
      </div>
      {!compact ? (
        <>
          <p className="detail">
            <span className="detail-label">Evidence:</span> {signal.evidence}
          </p>
          <p className="detail">
            <span className="detail-label">Action:</span> {signal.recommended_action}
          </p>
          <SourceCitation
            sourceUrl={signal.source_url}
            sourceNames={sourceNames}
            reviewedAt={signal.reviewed_at}
          />
        </>
      ) : null}
      <div className="owner">Owner: {signal.suggested_owner}</div>
    </article>
  );
}
