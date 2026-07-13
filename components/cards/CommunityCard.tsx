import type { Community } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function CommunityCard({ item }: { item: WithSourceNames<Community> | Community }) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className="surface-card">
      <h3 className="text-base font-bold">{item.name}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">Main utility:</span> {item.main_utility}
      </p>
      <p className="mt-2 text-sm italic text-[var(--ink-secondary)]">{item.editorial_note}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        <Badge tone="cyan">{item.update_frequency}</Badge>
        <Badge tone="slate">{item.region}</Badge>
        {item.platform.map((platform) => (
          <Badge key={platform} tone="slate">
            {platform}
          </Badge>
        ))}
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
