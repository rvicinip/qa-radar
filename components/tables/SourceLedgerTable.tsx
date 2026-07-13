import type { SourceRecord } from "@/lib/types/content-types";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";

export function SourceLedgerTable({ sources }: { sources: SourceRecord[] }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Authority</th>
            <th>Used for</th>
            <th>Last checked</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.id}>
              <td>
                <a href={source.url} className="font-semibold hover:underline" target="_blank" rel="noreferrer">
                  {source.name}
                </a>
                <p className="sum" style={{ marginTop: "4px" }}>
                  {source.notes}
                </p>
              </td>
              <td>
                <SourceBadge type={source.source_type} />
              </td>
              <td>
                <Badge tone={source.authority_level === "High" ? "green" : source.authority_level === "Medium" ? "amber" : "slate"}>
                  {source.authority_level}
                </Badge>
              </td>
              <td style={{ color: "var(--ink-secondary)" }}>{source.used_for.join(", ")}</td>
              <td style={{ color: "var(--ink-secondary)" }}>{source.last_checked}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
