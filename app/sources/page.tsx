import { AppShell } from "@/components/layout/AppShell";
import { SourceLedgerTable } from "@/components/tables/SourceLedgerTable";
import { getSources } from "@/lib/data/loader";

export default function SourcesPage() {
  const sources = getSources();

  return (
    <AppShell title="Source Ledger" tagline="Authoritative sources backing every published item">
      <SourceLedgerTable sources={sources} />
    </AppShell>
  );
}
