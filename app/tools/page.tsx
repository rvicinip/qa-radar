import { AppShell } from "@/components/layout/AppShell";
import { ToolsPageClient } from "@/components/pages/ToolsPageClient";
import { getSources, getTools } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function ToolsPage() {
  const tools = withSourceNames(getTools(), buildSourceNameMap(getSources()));

  return (
    <AppShell title="Tools" tagline="QA tools with maturity, risks, alternatives and official sites">
      <ToolsPageClient tools={tools} />
    </AppShell>
  );
}
