import { AppShell } from "@/components/layout/AppShell";
import { ChangeLogTable } from "@/components/tables/ChangeLogTable";
import { getChangelog } from "@/lib/data/loader";

export default async function EditionChangelogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entries = getChangelog(id);

  return (
    <AppShell title="Change Log" tagline="Editorial change log — what changed, when, and why">
      <ChangeLogTable entries={entries} />
    </AppShell>
  );
}
