import type { ToolItem } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function ToolCard({ item }: { item: WithSourceNames<ToolItem> | ToolItem }) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className="surface-card">
      <div className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--muted)]">{item.category}</div>
      <h3 className="mt-1 text-base font-bold">{item.name}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">Recommended use:</span> {item.recommended_use}
      </p>
      {item.risks_limitations.length > 0 ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Risks:</span> {item.risks_limitations.join("; ")}
        </p>
      ) : null}
      {item.alternatives.length > 0 ? (
        <p className="mt-2 text-sm">
          <span className="font-semibold">Alternatives:</span> {item.alternatives.join(", ")}
        </p>
      ) : null}
      <p className="mt-2 text-sm">
        <a href={item.official_site} className="font-semibold text-[var(--primary)] hover:underline" target="_blank" rel="noreferrer">
          Official site
        </a>
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        <Badge tone="green">{item.maturity}</Badge>
        <Badge tone="slate">{item.category}</Badge>
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
