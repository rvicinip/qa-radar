import Link from "next/link";
import type { EditionMeta } from "@/lib/types/content-types";

export function EditionCard({
  edition,
  isCurrent,
}: {
  edition: EditionMeta;
  isCurrent: boolean;
}) {
  return (
    <Link
      href={`/editions/${edition.id}`}
      className="surface-card"
      aria-label={`Open ${edition.label} edition`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{edition.label}</strong>
        {isCurrent ? <span className="badge cyan">Current</span> : null}
      </div>
      <p className="text-[var(--muted)]" style={{ fontSize: ".8rem", marginTop: "var(--space-1)" }}>
        Published {edition.published}
      </p>
    </Link>
  );
}
