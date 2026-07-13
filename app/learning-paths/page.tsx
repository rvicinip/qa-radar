import { AppShell } from "@/components/layout/AppShell";
import { LearningPathsPageClient } from "@/components/pages/LearningPathsPageClient";
import { getLearningPaths, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function LearningPathsPage() {
  const paths = withSourceNames(getLearningPaths(), buildSourceNameMap(getSources()));

  return (
    <AppShell title="Learning Paths" tagline="Structured QA learning paths with skills and progress evidence">
      <LearningPathsPageClient paths={paths} />
    </AppShell>
  );
}
