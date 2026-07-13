import type { NewsItem } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceBadge, SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function NewsCard({ item }: { item: WithSourceNames<NewsItem> | NewsItem }) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className="surface-card">
      <div className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--muted)]">
        {item.source_name} · {item.published_at}
      </div>
      <h3 className="mt-1 text-base font-bold">{item.title}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">QA impact:</span> {item.qa_impact}
      </p>
      <p className="mt-1 text-sm">
        <span className="font-semibold">Suggested action:</span> {item.suggested_action}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        <SourceBadge type={item.source_type} />
        <Badge tone="slate">{item.impact_category}</Badge>
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
