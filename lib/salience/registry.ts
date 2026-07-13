import fs from "fs";
import path from "path";

export type SalienceItem = {
  id: string;
  user_request: string;
  surfaces: string[];
  data_files: string[];
  min_count: number | Record<string, number>;
  count_filter?: { field: string; equals: string };
  added: string;
};

export type SalienceRegistry = {
  items: SalienceItem[];
};

export function getSalienceRegistry(): SalienceRegistry {
  const filePath = path.join(process.cwd(), "SALIENCE_REGISTRY.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as SalienceRegistry;
}

export function formatSurface(surface: string): string {
  const labels: Record<string, string> = {
    "nav:Standards": "Sidebar → Standards",
    "home:standards-strip": "Home → International standards section",
    "home:your-priorities": "Home → Your priorities strip",
    "footer:standards-count": "Footer → Standards coverage line",
    home: "Home dashboard",
    "page:/standards": "/standards",
    "page:/salience": "/salience",
    "page:/trends": "/trends",
    "page:/news": "/news",
    "page:/signal-board": "/signal-board",
  };
  return labels[surface] ?? surface;
}
