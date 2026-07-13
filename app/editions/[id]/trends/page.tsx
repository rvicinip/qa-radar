import { AppShell } from "@/components/layout/AppShell";
import { TrendMatrix } from "@/components/trends/TrendMatrix";
import { TrendsPageClient } from "@/components/pages/TrendsPageClient";
import { getSources, getTrends } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionTrendsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trends = withSourceNames(getTrends(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Trends" tagline="QA Trends Radar — classified by state and impact (matrix, not 4-ring radar)">
      <section className="mb-8" aria-label="Trend matrix overview">
        <TrendMatrix trends={trends} />
      </section>
      <section aria-label="All trends with search and filters">
        <h2 className="mb-4 text-lg font-bold">All trends</h2>
        <TrendsPageClient trends={trends} />
      </section>
    </AppShell>
  );
}
