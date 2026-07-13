"use client";

import { useMemo, useState } from "react";
import type { ToolItem } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { ToolCard } from "@/components/cards/ToolCard";
import { FilterBar, FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

export function ToolsPageClient({ tools }: { tools: WithSourceNames<ToolItem>[] }) {
  const searchable = useMemo(() => tools as SearchableItem[], [tools]);
  const [results, setResults] = useState(searchable);
  const [categoryFilter, setCategoryFilter] = useState("");
  const categories = [...new Set(tools.map((item) => item.category))];

  const visible = results.filter((item) => {
    const tool = item as WithSourceNames<ToolItem>;
    return !categoryFilter || tool.category === categoryFilter;
  });

  return (
    <>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterBar label="Category" options={categories} value={categoryFilter} onChange={setCategoryFilter} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((item) => (
          <ToolCard key={item.id} item={item as ToolItem} />
        ))}
      </div>
      <FilteredEmpty visibleCount={visible.length} />
    </>
  );
}
