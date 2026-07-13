"use client";

import { useMemo, useState } from "react";
import type { Standard, StandardCategory } from "@/lib/types/content-types";
import type { WithSourceNames } from "@/lib/data/source-names";
import { StandardCard } from "@/components/cards/StandardCard";
import { FilterBar, FilteredEmpty, SearchBox, type SearchableItem } from "@/components/search/SearchAndFilters";

const CATEGORIES: StandardCategory[] = [
  "governance",
  "testing",
  "security",
  "accessibility",
  "ai-codegen",
];

export function StandardsPageClient({ standards }: { standards: WithSourceNames<Standard>[] }) {
  const searchable = useMemo(() => standards as SearchableItem[], [standards]);
  const [results, setResults] = useState(searchable);
  const [categoryFilter, setCategoryFilter] = useState("");

  const visible = results.filter((item) => {
    const standard = item as WithSourceNames<Standard>;
    return !categoryFilter || standard.category === categoryFilter;
  });

  return (
    <>
      <p className="mb-4 text-sm text-[var(--ink-secondary)]">
        Canonical index of international frameworks for AI governance, testing, security, accessibility and
        AI-assisted code generation. Always maintained as a core dataset — not optional content.
      </p>
      <SearchBox items={searchable} onResults={setResults} />
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterBar label="Category" options={CATEGORIES} value={categoryFilter} onChange={setCategoryFilter} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {visible.map((item) => (
          <StandardCard key={item.id} item={item as Standard} />
        ))}
      </div>
      <FilteredEmpty visibleCount={visible.length} />
    </>
  );
}
