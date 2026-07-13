import { AppShell } from "@/components/layout/AppShell";
import { CommunitiesPageClient } from "@/components/pages/CommunitiesPageClient";
import { getCommunities, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionCommunitiesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const communities = withSourceNames(getCommunities(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Communities" tagline="QA communities — forums, Slack groups, conferences, and professional networks">
      <CommunitiesPageClient communities={communities} />
    </AppShell>
  );
}
