"use client";

import { useMemo, useState } from "react";
import type { LearningPath } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { LearningPathCard } from "@/components/cards/LearningPathCard";
import { FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function LearningPathsPageClient({ paths }: { paths: WithSourceNames<LearningPath>[] }) {
  const searchable = useMemo(() => paths as SearchableItem[], [paths]);
  const [results, setResults] = useState(searchable);

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((item) => (
          <LearningPathCard key={item.id} item={item as LearningPath} />
        ))}
      </div>
      <FilteredEmpty visibleCount={results.length} />
    </>
  );
}
