import { AppShell } from "@/components/layout/AppShell";
import { BestPracticesPageClient } from "@/components/pages/BestPracticesPageClient";
import { getBestPractices, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function BestPracticesPage() {
  const practices = withSourceNames(getBestPractices(), buildSourceNameMap(getSources()));

  return (
    <AppShell title="Best Practices" tagline="Evidence-based QA practices grouped by category">
      <BestPracticesPageClient practices={practices} />
    </AppShell>
  );
}
