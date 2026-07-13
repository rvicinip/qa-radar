import type { Standard } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function StandardCard({ item }: { item: WithSourceNames<Standard> | Standard }) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className="surface-card">
      <div className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--muted)]">
        {item.publisher}
      </div>
      <h3 className="mt-1 text-base font-bold">{item.name}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">QA relevance:</span> {item.qa_relevance}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        <Badge tone="violet">{item.category}</Badge>
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} tone="slate">
            {tag}
          </Badge>
        ))}
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
