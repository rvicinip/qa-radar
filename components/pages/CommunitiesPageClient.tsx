"use client";

import { useMemo, useState } from "react";
import type { Community } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { FilterBar, FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function CommunitiesPageClient({ communities }: { communities: WithSourceNames<Community>[] }) {
  const searchable = useMemo(() => communities as SearchableItem[], [communities]);
  const [results, setResults] = useState(searchable);
  const [platformFilter, setPlatformFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");

  const platforms = [...new Set(communities.flatMap((item) => item.platform))];
  const regions = [...new Set(communities.map((item) => item.region))];

  const visible = results.filter((item) => {
    const community = item as WithSourceNames<Community>;
    if (platformFilter && !community.platform.includes(platformFilter)) return false;
    if (regionFilter && community.region !== regionFilter) return false;
    return true;
  });

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterBar label="Platform" options={platforms} value={platformFilter} onChange={setPlatformFilter} />
        <FilterBar label="Region" options={regions} value={regionFilter} onChange={setRegionFilter} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((item) => (
          <CommunityCard key={item.id} item={item as Community} />
        ))}
      </div>
      <FilteredEmpty visibleCount={visible.length} />
    </>
  );
}
