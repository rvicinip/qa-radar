import { AppShell } from "@/components/layout/AppShell";
import { LearningPathsPageClient } from "@/components/pages/LearningPathsPageClient";
import { getLearningPaths, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionLearningPathsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paths = withSourceNames(getLearningPaths(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Learning Paths" tagline="Structured learning journeys — from manual testing to SDET and QA leadership">
      <LearningPathsPageClient paths={paths} />
    </AppShell>
  );
}
