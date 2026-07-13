"use client";

import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";

export type SearchableItem = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  sourceNames?: string[];
};

export function SearchBox({
  items,
  onResults,
  placeholder = "Search title, summary, tags, sources…",
}: {
  items: SearchableItem[];
  onResults: (results: SearchableItem[]) => void;
  placeholder?: string;
}) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "summary", "tags", "sourceNames"],
        threshold: 0.35,
      }),
    [items],
  );

  function handleSearch(value: string) {
    setQuery(value);
    if (!value.trim()) {
      onResults(items);
      return;
    }
    onResults(fuse.search(value).map((result) => result.item));
  }

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <label className="sr-only" htmlFor="search-box">
        Search
      </label>
      <input
        id="search-box"
        type="search"
        value={query}
        onChange={(event) => handleSearch(event.target.value)}
        placeholder={placeholder}
        className="field-input"
      />
      {query ? (
        <button type="button" onClick={() => handleSearch("")} className="btn secondary sm">
          Clear search
        </button>
      ) : null}
    </div>
  );
}

export function FilterBar({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex min-w-[140px] flex-1 flex-col gap-1 text-xs font-semibold text-[var(--ink-secondary)]">
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)} className="field-input">
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilteredEmpty({ visibleCount }: { visibleCount: number }) {
  if (visibleCount > 0) return null;
  return <EmptyState title="No items match your search or filters." message="Try clearing filters or using different keywords." />;
}
