import { AppShell } from "@/components/layout/AppShell";
import { StandardsPageClient } from "@/components/pages/StandardsPageClient";
import { getSources, getStandards } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionStandardsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const standards = withSourceNames(getStandards(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Standards" tagline="International standards index — ISO, NIST, EU AI Act, OWASP, IEEE, WCAG, OECD…">
      <StandardsPageClient standards={standards} />
    </AppShell>
  );
}
