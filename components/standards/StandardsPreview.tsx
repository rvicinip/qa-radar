import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ConfidenceBadge } from "@/components/ui/ConfidenceBadge";
import type { Standard } from "@/lib/types/content-types";

const CATEGORY_TONE: Record<Standard["category"], "violet" | "cyan" | "green" | "slate"> = {
  governance: "violet",
  testing: "cyan",
  security: "green",
  accessibility: "slate",
  "ai-codegen": "violet",
};

export function StandardsPreview({ standards }: { standards: Standard[] }) {
  const preview = standards.slice(0, 4);

  return (
    <section className="section" aria-labelledby="standards-heading">
      <div className="section-head">
        <h3 id="standards-heading">
          International standards &amp; AI governance <Badge tone="violet">Core pillar</Badge>
        </h3>
        <Link href="/standards" className="hint no-underline hover:underline">
          All {standards.length} frameworks at /standards →
        </Link>
      </div>

      {preview.length > 0 ? (
        <div className="preview-grid">
          {preview.map((standard) => (
            <article key={standard.id} className="preview">
              <div className="ptype">{standard.publisher}</div>
              <h4>{standard.name}</h4>
              <p>{standard.summary}</p>
              <div className="foot">
                <ConfidenceBadge level={standard.confidence_level} />
                <Badge tone={CATEGORY_TONE[standard.category]}>{standard.category}</Badge>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="preview">
          <p>Standards index loading…</p>
        </div>
      )}
    </section>
  );
}
