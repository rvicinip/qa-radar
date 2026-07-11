import fs from "fs";
import path from "path";
import { z } from "zod";
import {
  bestPracticesFileSchema,
  changelogFileSchema,
  communitiesFileSchema,
  eventsFileSchema,
  learningPathsFileSchema,
  newsFileSchema,
  signalsFileSchema,
  sourcesFileSchema,
  toolsFileSchema,
  standardsFileSchema,
  trendsFileSchema,
  ecosystemFileSchema,
  editionsManifestSchema,
} from "@/lib/schemas";
import type {
  BestPractice,
  ChangeLogEntry,
  Community,
  EventItem,
  LearningPath,
  NewsItem,
  SignalCard,
  SourceRecord,
  Standard,
  ToolItem,
  Trend,
  EditionMeta,
  EcosystemItem,
} from "@/lib/types/content-types";

const dataRoot = path.join(process.cwd(), "data");
const editionsRoot = path.join(dataRoot, "editions");

export function getEditionsManifest() {
  const raw = fs.readFileSync(path.join(dataRoot, "editions.json"), "utf-8");
  return editionsManifestSchema.parse(JSON.parse(raw));
}

export function getEditions(): EditionMeta[] {
  return getEditionsManifest().editions;
}

export function getCurrentEditionId(): string {
  return getEditionsManifest().current;
}

export function getEditionMeta(id: string): EditionMeta {
  const found = getEditions().find((e) => e.id === id);
  if (!found) throw new Error(`Unknown edition: ${id}`);
  return found;
}

function editionDir(editionId?: string): string {
  return path.join(editionsRoot, editionId ?? getCurrentEditionId());
}

function readJsonFile<T>(filename: string, schema: z.ZodType<T>, editionId?: string): T {
  const filePath = path.join(editionDir(editionId), filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return schema.parse(JSON.parse(raw));
}

export function getTrends(editionId?: string): Trend[] {
  return readJsonFile("trends.json", trendsFileSchema, editionId);
}

export function getNews(editionId?: string): NewsItem[] {
  return readJsonFile("news.json", newsFileSchema, editionId);
}

export function getCommunities(editionId?: string): Community[] {
  return readJsonFile("communities.json", communitiesFileSchema, editionId);
}

export function getBestPractices(editionId?: string): BestPractice[] {
  return readJsonFile("best-practices.json", bestPracticesFileSchema, editionId);
}

export function getTools(editionId?: string): ToolItem[] {
  return readJsonFile("tools.json", toolsFileSchema, editionId);
}

export function getEvents(editionId?: string): EventItem[] {
  return readJsonFile("events.json", eventsFileSchema, editionId);
}

export function getLearningPaths(editionId?: string): LearningPath[] {
  return readJsonFile("learning-paths.json", learningPathsFileSchema, editionId);
}

export function getSignals(editionId?: string): SignalCard[] {
  return readJsonFile("signals.json", signalsFileSchema, editionId);
}

export function getSources(editionId?: string): SourceRecord[] {
  return readJsonFile("sources.json", sourcesFileSchema, editionId);
}

export function getChangelog(editionId?: string): ChangeLogEntry[] {
  return readJsonFile("changelog.json", changelogFileSchema, editionId);
}

export function getStandards(editionId?: string): Standard[] {
  return readJsonFile("standards.json", standardsFileSchema, editionId);
}

export function getEcosystem(editionId?: string): EcosystemItem[] {
  const filePath = path.join(editionDir(editionId), "ecosystem.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return ecosystemFileSchema.parse(JSON.parse(raw));
}

export function getSourceMap(editionId?: string): Map<string, SourceRecord> {
  return new Map(getSources(editionId).map((source) => [source.id, source]));
}

export function getLastUpdatedDate(editionId?: string): string {
  const dates = [
    ...getTrends(editionId).map((item) => item.updated_at),
    ...getNews(editionId).map((item) => item.updated_at),
    ...getCommunities(editionId).map((item) => item.updated_at),
    ...getBestPractices(editionId).map((item) => item.updated_at),
    ...getTools(editionId).map((item) => item.updated_at),
    ...getEvents(editionId).map((item) => item.updated_at),
    ...getLearningPaths(editionId).map((item) => item.updated_at),
    ...getSignals(editionId).map((item) => item.updated_at),
    ...getChangelog(editionId).map((item) => item.date),
    ...getStandards(editionId).map((item) => item.updated_at),
  ];

  return dates.sort().at(-1) ?? "—";
}

export function resolveSourceNames(sourceIds: string[], editionId?: string): string[] {
  const map = getSourceMap(editionId);
  return sourceIds.map((id) => map.get(id)?.name ?? id);
}
