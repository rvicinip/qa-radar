"use client";

import { useMemo, useState } from "react";
import type { BestPractice } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { BestPracticeCard } from "@/components/cards/BestPracticeCard";
import { FilterBar, FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function BestPracticesPageClient({ practices }: { practices: WithSourceNames<BestPractice>[] }) {
  const searchable = useMemo(() => practices as SearchableItem[], [practices]);
  const [results, setResults] = useState(searchable);
  const [categoryFilter, setCategoryFilter] = useState("");
  const categories = [...new Set(practices.map((item) => item.category))];

  const visible = results.filter((item) => {
    const practice = item as WithSourceNames<BestPractice>;
    return !categoryFilter || practice.category === categoryFilter;
  });

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterBar label="Category" options={categories} value={categoryFilter} onChange={setCategoryFilter} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((item) => (
          <BestPracticeCard key={item.id} item={item as BestPractice} />
        ))}
      </div>
      <FilteredEmpty visibleCount={visible.length} />
    </>
  );
}
