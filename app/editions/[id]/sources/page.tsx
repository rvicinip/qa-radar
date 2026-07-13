import { AppShell } from "@/components/layout/AppShell";
import { SourceLedgerTable } from "@/components/tables/SourceLedgerTable";
import { getSources } from "@/lib/data/loader";

export default async function EditionSourcesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sources = getSources(id);

  return (
    <AppShell title="Source Ledger" tagline="All tracked sources — authority level, usage, and last-checked dates">
      <SourceLedgerTable sources={sources} />
    </AppShell>
  );
}
