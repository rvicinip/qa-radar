import { AppShell } from "@/components/layout/AppShell";
import { EventsPageClient } from "@/components/pages/EventsPageClient";
import { getEvents, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionEventsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const events = withSourceNames(getEvents(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="Events" tagline="QA conferences, webinars, meetups, and workshops">
      <EventsPageClient events={events} />
    </AppShell>
  );
}
