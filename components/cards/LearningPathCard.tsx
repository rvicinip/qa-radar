import type { LearningPath } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import { SourceCitation } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function LearningPathCard({ item }: { item: WithSourceNames<LearningPath> | LearningPath }) {
  const sourceNames = "sourceNames" in item ? item.sourceNames : item.source_ids;

  return (
    <article className="surface-card">
      <h3 className="text-base font-bold">{item.title}</h3>
      <p className="mt-2 text-sm text-[var(--ink-secondary)]">{item.summary}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold">Objective:</span> {item.objective}
      </p>
      <p className="mt-2 text-sm">
        <span className="font-semibold">Practical project:</span> {item.practical_project}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        <ConfidenceBadge level={item.confidence_level} />
        {item.required_skills.map((skill) => (
          <Badge key={skill} tone="slate">
            {skill}
          </Badge>
        ))}
      </div>
      <SourceCitation sourceUrl={item.source_url} sourceNames={sourceNames} reviewedAt={item.reviewed_at} />
    </article>
  );
}
