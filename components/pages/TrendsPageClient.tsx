"use client";

import { useMemo, useState } from "react";
import type { Trend } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { TrendCard } from "@/components/trends/TrendMatrix";
import { FilterBar, FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function TrendsPageClient({ trends }: { trends: WithSourceNames<Trend>[] }) {
  const searchable = useMemo(() => trends as SearchableItem[], [trends]);

  const [results, setResults] = useState(searchable);
  const [stateFilter, setStateFilter] = useState("");
  const [impactFilter, setImpactFilter] = useState("");

  const visible = results.filter((item) => {
    const trend = item as WithSourceNames<Trend>;
    if (stateFilter && trend.state !== stateFilter) return false;
    if (impactFilter && trend.impact !== impactFilter) return false;
    return true;
  });

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterBar
          label="State"
          options={["Emerging", "Growing", "Mature", "Declining", "Hype-risk"]}
          value={stateFilter}
          onChange={setStateFilter}
        />
        <FilterBar
          label="Impact"
          options={["Low", "Medium", "High", "Critical"]}
          value={impactFilter}
          onChange={setImpactFilter}
        />
        {(stateFilter || impactFilter) && (
          <button
            type="button"
            className="btn secondary sm self-end"
            onClick={() => {
              setStateFilter("");
              setImpactFilter("");
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="grid gap-4">
        {visible.map((item) => (
          <TrendCard key={item.id} trend={item as Trend} sourceNames={(item as WithSourceNames<Trend>).sourceNames} />
        ))}
      </div>
      <FilteredEmpty visibleCount={visible.length} />
    </>
  );
}
