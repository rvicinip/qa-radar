import { AppShell } from "@/components/layout/AppShell";
import { EventsPageClient } from "@/components/pages/EventsPageClient";
import { getEvents, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function EventsPage() {
  const events = withSourceNames(getEvents(), buildSourceNameMap(getSources()));

  return (
    <AppShell title="Events" tagline="QA events sorted by date with mode, location and relevance">
      <EventsPageClient events={events} />
    </AppShell>
  );
}
