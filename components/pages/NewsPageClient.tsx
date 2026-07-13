"use client";

import { useMemo, useState } from "react";
import type { NewsItem } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { NewsCard } from "@/components/cards/NewsCard";
import { FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function NewsPageClient({ news }: { news: WithSourceNames<NewsItem>[] }) {
  const searchable = useMemo(
    () =>
      news.map((item) => ({
        ...item,
        sourceNames: [item.source_name, ...item.sourceNames],
      })) as SearchableItem[],
    [news],
  );

  const [results, setResults] = useState(searchable);

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="grid gap-4">
        {results.map((item) => (
          <NewsCard key={item.id} item={item as NewsItem} />
        ))}
      </div>
      <FilteredEmpty visibleCount={results.length} />
    </>
  );
}
