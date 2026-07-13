import type { SignalCard } from "@/lib/types/content-types";
import { BOARD_COLUMNS } from "@/lib/constants/board-states";
import { SignalCardItem } from "@/components/kanban/SignalCardItem";

export function KanbanBoard({
  signals,
  compact = false,
  sourceNameMap,
}: {
  signals: SignalCard[];
  compact?: boolean;
  sourceNameMap?: Map<string, string>;
}) {
  return (
    <div className="kanban" role="list" aria-label="Signal board columns">
      {BOARD_COLUMNS.map((column) => {
        const columnSignals = signals.filter((signal) => signal.board_state === column);

        return (
          <div key={column} className="kanban-col" role="listitem">
            <div className="col-head">{column}</div>
            <div className="col-body">
              {columnSignals.length === 0 ? (
                <p className="col-empty">No signals yet</p>
              ) : (
                columnSignals.map((signal) => (
                  <SignalCardItem
                    key={signal.id}
                    signal={signal}
                    compact={compact}
                    sourceNames={
                      sourceNameMap
                        ? signal.source_ids.map((id) => sourceNameMap.get(id) ?? id)
                        : undefined
                    }
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
