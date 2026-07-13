import { AppShell } from "@/components/layout/AppShell";
import { ToolsPageClient } from "@/components/pages/ToolsPageClient";
import { getSources, getTools } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionToolsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tools = withSourceNames(getTools(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Tools" tagline="QA tooling landscape — frameworks, runners, reporting, and utilities">
      <ToolsPageClient tools={tools} />
    </AppShell>
  );
}
