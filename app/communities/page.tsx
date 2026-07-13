import { AppShell } from "@/components/layout/AppShell";
import { CommunitiesPageClient } from "@/components/pages/CommunitiesPageClient";
import { getCommunities, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function CommunitiesPage() {
  const communities = withSourceNames(getCommunities(), buildSourceNameMap(getSources()));

  return (
    <AppShell title="Communities" tagline="Professional QA communities with editorial notes and activity signals">
      <CommunitiesPageClient communities={communities} />
    </AppShell>
  );
}
