import type { SourceRecord } from "@/lib/types/content-types";

export function buildSourceNameMap(sources: SourceRecord[]): Map<string, string> {
  return new Map(sources.map((source) => [source.id, source.name]));
}

export function namesForIds(sourceIds: string[], map: Map<string, string>): string[] {
  return sourceIds.map((id) => map.get(id) ?? id);
}

export type WithSourceNames<T> = T & { sourceNames: string[] };

export function withSourceNames<T extends { source_ids: string[] }>(
  items: T[],
  map: Map<string, string>,
): WithSourceNames<T>[] {
  return items.map((item) => ({
    ...item,
    sourceNames: namesForIds(item.source_ids, map),
  }));
}
