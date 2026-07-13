import { AppShell } from "@/components/layout/AppShell";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { getSignals, getSources } from "@/lib/data/loader";
import { buildSourceNameMap } from "@/lib/data/source-names";

export default async function EditionSignalBoardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const signals = getSignals(id);
  const sourceNameMap = buildSourceNameMap(getSources(id));

  return (
    <AppShell title="Signal Board" tagline="7-column Kanban — track signals from first notice to adoption or rejection">
      <KanbanBoard signals={signals} sourceNameMap={sourceNameMap} />
    </AppShell>
  );
}
