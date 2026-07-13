import type { EventItem } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function EventCard({
  item,
  isPast,
}: {
  item: WithSourceNames<EventItem> | EventItem;
  isPast: boolean;
}) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className={`surface-card${isPast ? " opacity-70" : ""}`}>
      <div className="flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-wide text-[var(--muted)]">
        <span>
          {item.start_date}
          {item.end_date ? ` – ${item.end_date}` : ""}
        </span>
        {isPast ? <Badge tone="slate">Past</Badge> : <Badge tone="green">Upcoming</Badge>}
      </div>
      <h3 className="mt-1 text-base font-bold">{item.name}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">Mode:</span> {item.mode} · {item.location}
      </p>
      <p className="mt-2 text-sm">
        <span className="font-semibold">Relevance for QA:</span> {item.relevance_for_qa}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        <Badge tone="cyan">{item.mode}</Badge>
        {item.topics.map((topic) => (
          <Badge key={topic} tone="slate">
            {topic}
          </Badge>
        ))}
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
