import type { BestPractice } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function BestPracticeCard({ item }: { item: WithSourceNames<BestPractice> | BestPractice }) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className="surface-card">
      <div className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--muted)]">{item.category}</div>
      <h3 className="mt-1 text-base font-bold">{item.name}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">Problem solved:</span> {item.problem_solved}
      </p>
      <p className="mt-2 text-sm">
        <span className="font-semibold">Expected evidence:</span> {item.expected_evidence.join("; ")}
      </p>
      {item.useful_metrics.length > 0 ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Metrics:</span> {item.useful_metrics.join(", ")}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        <Badge tone="slate">{item.category}</Badge>
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
