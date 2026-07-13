import { AppShell } from "@/components/layout/AppShell";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { getSignals, getSources } from "@/lib/data/loader";
import { buildSourceNameMap } from "@/lib/data/source-names";

export default function SignalBoardPage() {
  const signals = getSignals();
  const sourceMap = buildSourceNameMap(getSources());

  return (
    <AppShell
      title="Signal Board"
      tagline="Static 7-column Kanban for QA signal triage — not a 4-ring technology radar"
    >
      <KanbanBoard signals={signals} sourceNameMap={sourceMap} />
    </AppShell>
  );
}
