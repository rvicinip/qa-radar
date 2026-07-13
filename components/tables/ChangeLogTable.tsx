import type { ChangeLogEntry } from "@/lib/types/content-types";
import { Badge } from "@/components/ui/Badge";

export function ChangeLogTable({ entries }: { entries: ChangeLogEntry[] }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Change</th>
            <th>Item</th>
            <th>Summary</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td style={{ color: "var(--ink-secondary)" }}>{entry.date}</td>
              <td>
                <Badge tone="cyan">{entry.change_type}</Badge>
              </td>
              <td>
                <code>{entry.item_id}</code>
              </td>
              <td>
                <p>{entry.summary}</p>
                <p className="sum" style={{ marginTop: "4px" }}>
                  {entry.reason}
                </p>
              </td>
              <td>
                <Badge tone={entry.review_status === "approved" ? "green" : "amber"}>{entry.review_status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
