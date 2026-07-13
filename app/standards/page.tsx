import { AppShell } from "@/components/layout/AppShell";
import { StandardsPageClient } from "@/components/pages/StandardsPageClient";
import { getSources, getStandards } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function StandardsPage() {
  const standards = withSourceNames(getStandards(), buildSourceNameMap(getSources()));

  return (
    <AppShell
      title="International Standards"
      tagline={`${standards.length} frameworks tracked — AI governance, testing, security, accessibility and codegen`}
    >
      <StandardsPageClient standards={standards} />
    </AppShell>
  );
}
