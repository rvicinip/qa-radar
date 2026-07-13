import { getStandards } from "@/lib/data/loader";

export function Footer() {
  const standardsCount = getStandards().length;

  return (
    <footer className="foot">
      <span>QA Radar · Phase 1 static MVP · evidence-first QA intelligence</span>
      <span>
        Standards coverage: {standardsCount > 0 ? `${standardsCount} frameworks tracked` : "Standards index loading…"}
        {" · "}
        Content from curated JSON · validated with Zod
      </span>
    </footer>
  );
}
