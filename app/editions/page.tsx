import { AppShell } from "@/components/layout/AppShell";
import { EditionCard } from "@/components/editions/EditionCard";
import { getEditions, getCurrentEditionId } from "@/lib/data/loader";

export default function EditionsIndexPage() {
  const editions = [...getEditions()].sort((a, b) => b.id.localeCompare(a.id));
  const current = getCurrentEditionId();

  return (
    <AppShell title="Editions" tagline="QA Radar as a monthly newspaper — browse every published edition">
      <section aria-label="All editions" style={{ display: "grid", gap: "var(--space-4)" }}>
        {editions.map((e) => (
          <EditionCard key={e.id} edition={e} isCurrent={e.id === current} />
        ))}
      </section>
    </AppShell>
  );
}
