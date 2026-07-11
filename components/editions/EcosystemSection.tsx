import type { EcosystemItem, EcosystemVerdict } from "@/lib/types/content-types";

const VERDICT_LABEL: Record<EcosystemVerdict, string> = {
  adopt: "Adopt",
  trial: "Trial",
  watch: "Watch",
  "not-applicable": "Not applicable",
};

export function EcosystemSection({ items }: { items: EcosystemItem[] }) {
  return (
    <div className="card" id="improve-our-ecosystem">
      <h2>Improve our ecosystem</h2>
      <p className="muted" style={{ fontSize: ".8rem" }}>
        Recommendations for AI-Ops / IntelliQuip QA derived from this month&apos;s signals.
        Approved items are promoted to the Workspace Improvements Backlog.
      </p>
      {items.length === 0 ? (
        <p className="muted">No ecosystem recommendations recorded for this edition yet.</p>
      ) : (
        <ul>
          {items.map((it) => (
            <li key={it.id}>
              <strong>{VERDICT_LABEL[it.verdict]}</strong> · [{it.target}] {it.title}
              {it.backlog_id ? <span className="badge cyan"> {it.backlog_id}</span> : null}
              <div className="muted" style={{ fontSize: ".78rem" }}>{it.rationale}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
