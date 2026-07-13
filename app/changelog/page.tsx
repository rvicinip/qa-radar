import { AppShell } from "@/components/layout/AppShell";
import { ChangeLogTable } from "@/components/tables/ChangeLogTable";
import { getChangelog } from "@/lib/data/loader";

export default function ChangelogPage() {
  const entries = getChangelog();

  return (
    <AppShell title="Change Log" tagline="Editorial changes with review status and reasons">
      <ChangeLogTable entries={entries} />
    </AppShell>
  );
}
