import type { EcosystemItem } from "@/lib/types/content-types";
import { Badge } from "@/components/ui/Badge";

const VERDICT_LABEL: Record<string, string> = {
  adopt: "Adopt",
  trial: "Trial",
  watch: "Watch",
  "not-applicable": "Not applicable",
};

const VERDICT_TONE: Record<string, "green" | "cyan" | "amber" | "slate"> = {
  adopt: "green",
  trial: "cyan",
  watch: "amber",
  "not-applicable": "slate",
};

const TARGET_LABEL: Record<string, string> = {
  "ai-ops": "AI-Ops",
  "iq-qa": "IQ QA",
};

export function EcosystemSection({ items }: { items: EcosystemItem[] }) {
  return (
    <div className="surface-card" id="improve-our-ecosystem">
      <div className="section-head">
        <h3>Improve our ecosystem</h3>
      </div>
      <p className="text-[var(--muted)]" style={{ fontSize: ".8rem", marginBottom: "var(--space-3)" }}>
        Recommendations for AI-Ops / IntelliQuip QA derived from this month&apos;s signals.
        Approved items are promoted to the Workspace Improvements Backlog.
      </p>
      {items.length === 0 ? (
        <p className="text-[var(--muted)]">No ecosystem recommendations recorded for this edition yet.</p>
      ) : (
        <div className="preview-grid">
          {items.map((it) => (
            <article key={it.id} className="preview">
              <div className="ptype">{TARGET_LABEL[it.target] ?? it.target}</div>
              <h4>{it.title}</h4>
              <p className="text-[var(--ink-secondary)]" style={{ fontSize: ".84rem" }}>
                {it.rationale}
              </p>
              <div className="foot">
                <Badge tone={VERDICT_TONE[it.verdict] ?? "slate"}>
                  {VERDICT_LABEL[it.verdict] ?? it.verdict}
                </Badge>
                {it.backlog_id ? (
                  <span className="badge cyan" style={{ marginLeft: "var(--space-1)" }}>
                    {it.backlog_id}
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
