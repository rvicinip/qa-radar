import { AppShell } from "@/components/layout/AppShell";
import { BestPracticesPageClient } from "@/components/pages/BestPracticesPageClient";
import { getBestPractices, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionBestPracticesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const practices = withSourceNames(getBestPractices(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Best Practices" tagline="Evidence-backed QA practices — when to use them, when not to, and what to measure">
      <BestPracticesPageClient practices={practices} />
    </AppShell>
  );
}
