import { AppShell } from "@/components/layout/AppShell";
import { EditionCard } from "@/components/editions/EditionCard";
import { getEditions, getCurrentEditionId } from "@/lib/data/loader";

export default function EditionsIndexPage() {
  const editions = [...getEditions()].sort((a, b) => b.id.localeCompare(a.id));
  const current = getCurrentEditionId();

  return (
    <AppShell title="Editions" tagline="QA Radar as a monthly newspaper — browse every published edition">
      <section className="section">
        <div className="section-head">
          <h3>All editions</h3>
        </div>
        <div className="preview-grid">
          {editions.map((e) => (
            <EditionCard key={e.id} edition={e} isCurrent={e.id === current} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
