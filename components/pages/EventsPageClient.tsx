"use client";

import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { EventCard } from "@/components/cards/EventCard";
import { FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function EventsPageClient({ events }: { events: WithSourceNames<EventItem>[] }) {
  const today = "2026-06-09";
  const searchable = useMemo(() => events as SearchableItem[], [events]);
  const [results, setResults] = useState(searchable);
  const sorted = [...(results as WithSourceNames<EventItem>[])].sort((a, b) => a.start_date.localeCompare(b.start_date));

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="grid gap-4">
        {sorted.map((item) => (
          <EventCard key={item.id} item={item} isPast={item.start_date < today} />
        ))}
      </div>
      <FilteredEmpty visibleCount={sorted.length} />
    </>
  );
}
