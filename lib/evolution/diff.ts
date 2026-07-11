import type { TrendState } from "@/lib/types/content-types";

type IdItem = { id: string; title: string };
type TrendLike = IdItem & { state: TrendState };
type EcoLike = { id: string; status: string };

export interface EditionSnapshot {
  id: string;
  trends: TrendLike[];
  news: IdItem[];
  tools: IdItem[];
  signals: IdItem[];
  standards: IdItem[];
  ecosystem: EcoLike[];
}

export type DiffKind = "trends" | "news" | "tools" | "signals" | "standards";

export interface DiffItem {
  id: string;
  title: string;
  kind: DiffKind;
}

export interface TrendStateChange {
  id: string;
  name: string;
  from: TrendState;
  to: TrendState;
}

export interface EditionDiff {
  from: string;
  to: string;
  launches: DiffItem[];
  removals: DiffItem[];
  trendStateChanges: TrendStateChange[];
  ecosystem: {
    added: EcoLike[];
    promoted: EcoLike[];
    done: EcoLike[];
  };
}

const KINDS: DiffKind[] = ["trends", "news", "tools", "signals", "standards"];

export function diffEditions(from: EditionSnapshot, to: EditionSnapshot): EditionDiff {
  const launches: DiffItem[] = [];
  const removals: DiffItem[] = [];

  for (const kind of KINDS) {
    const fromIds = new Set(from[kind].map((i) => i.id));
    const toIds = new Set(to[kind].map((i) => i.id));
    for (const item of to[kind]) {
      if (!fromIds.has(item.id)) launches.push({ id: item.id, title: item.title, kind });
    }
    for (const item of from[kind]) {
      if (!toIds.has(item.id)) removals.push({ id: item.id, title: item.title, kind });
    }
  }

  const trendStateChanges: TrendStateChange[] = [];
  const fromTrendById = new Map(from.trends.map((t) => [t.id, t]));
  for (const t of to.trends) {
    const prev = fromTrendById.get(t.id);
    if (prev && prev.state !== t.state) {
      trendStateChanges.push({ id: t.id, name: t.title, from: prev.state, to: t.state });
    }
  }

  const fromEcoById = new Map(from.ecosystem.map((e) => [e.id, e]));
  const added: EcoLike[] = [];
  const promoted: EcoLike[] = [];
  const done: EcoLike[] = [];
  for (const e of to.ecosystem) {
    const prev = fromEcoById.get(e.id);
    if (!prev) added.push(e);
    else if (prev.status !== "promoted" && e.status === "promoted") promoted.push(e);
    else if (prev.status !== "done" && e.status === "done") done.push(e);
  }

  return {
    from: from.id,
    to: to.id,
    launches,
    removals,
    trendStateChanges,
    ecosystem: { added, promoted, done },
  };
}
