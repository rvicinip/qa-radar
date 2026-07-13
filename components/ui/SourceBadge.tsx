import type { SourceType } from "@/lib/types/content-types";
import { Badge } from "@/components/ui/Badge";

const sourceLabels: Record<SourceType, string> = {
  official: "Official",
  community: "Community",
  vendor: "Vendor",
  news: "News",
  opinion: "Opinion",
  standard: "Standard",
  documentation: "Documentation",
};

const sourceTone: Record<SourceType, "green" | "cyan" | "amber" | "blue" | "violet" | "slate"> = {
  official: "green",
  community: "cyan",
  vendor: "amber",
  news: "blue",
  opinion: "violet",
  standard: "slate",
  documentation: "slate",
};

export function SourceBadge({ type }: { type: SourceType }) {
  return <Badge tone={sourceTone[type]}>{sourceLabels[type]}</Badge>;
}

export function SourceCitation({
  sourceUrl,
  sourceNames,
  reviewedAt,
}: {
  sourceUrl: string;
  sourceNames: string[];
  reviewedAt: string;
}) {
  const label = sourceNames.length > 0 ? sourceNames.join(", ") : "Source";

  return (
    <p className="mt-2 text-xs text-[var(--ink-secondary)]">
      Source:{" "}
      <a href={sourceUrl} className="font-semibold text-[var(--primary)] hover:underline" target="_blank" rel="noreferrer">
        {label}
      </a>
      {" · "}Reviewed {reviewedAt}
    </p>
  );
}
