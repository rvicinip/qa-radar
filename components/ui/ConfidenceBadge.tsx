import type { ConfidenceLevel } from "@/lib/types/content-types";
import { Badge } from "@/components/ui/Badge";

const confidenceTone: Record<ConfidenceLevel, "green" | "cyan" | "amber" | "blue" | "violet" | "slate"> = {
  Verified: "green",
  "Community Signal": "cyan",
  "Vendor Claim": "amber",
  "News Signal": "blue",
  "Opinion / Commentary": "violet",
  "Deprecated / Archived": "slate",
};

export function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  return <Badge tone={confidenceTone[level]}>{level}</Badge>;
}
