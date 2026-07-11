#!/usr/bin/env node
/**
 * Ensures every user-requested QA Radar item still "shows up" (salience rule).
 * Replaces the narrower ensure-standards-salient.mjs — one validator for all directives.
 * Run: npm run validate:salience
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataRoot = path.join(root, "data");
function currentEditionId() {
  const m = JSON.parse(fs.readFileSync(path.join(dataRoot, "editions.json"), "utf8"));
  return m.current;
}
const dataDir = path.join(dataRoot, "editions", currentEditionId());

const CANONICAL_STANDARD_IDS = [
  "iso-42001",
  "iso-29119",
  "nist-ai-rmf",
  "eu-ai-act",
  "owasp-llm-top10",
  "wcag-22",
  "oecd-ai-principles",
];

const SURFACE_CHECKS = {
  "nav:Standards": {
    file: "lib/constants/navigation.ts",
    pattern: /href:\s*"\/standards"/,
  },
  "home:standards-strip": {
    file: "app/page.tsx",
    pattern: /StandardsPreview|standards-heading/,
  },
  "home:your-priorities": {
    file: "app/page.tsx",
    pattern: /your-priorities|YourPrioritiesStrip/,
  },
  "page:/standards": {
    file: "app/standards/page.tsx",
    pattern: /.*/,
  },
  "page:/best-practices": {
    file: "app/best-practices/page.tsx",
    pattern: /.*/,
  },
  "page:/salience": {
    file: "app/salience/page.tsx",
    pattern: /.*/,
  },
  "footer:standards-count": {
    file: "components/layout/Footer.tsx",
    pattern: /Standards coverage/,
  },
  home: { file: "app/page.tsx", pattern: /.*/ },
  "page:/trends": { file: "app/trends/page.tsx", pattern: /.*/ },
  "page:/news": { file: "app/news/page.tsx", pattern: /.*/ },
  "page:/signal-board": { file: "app/signal-board/page.tsx", pattern: /.*/ },
  "nav:Editions": {
    file: "lib/constants/navigation.ts",
    pattern: /href:\s*"\/editions"/,
  },
  "page:/editions": {
    file: "app/editions/page.tsx",
    pattern: /.*/,
  },
  "page:/evolution": {
    file: "app/evolution/page.tsx",
    pattern: /.*/,
  },
  "ecosystem:improve-our-ecosystem": {
    file: "components/editions/EcosystemSection.tsx",
    pattern: /improve-our-ecosystem/,
  },
};

function readRegistry() {
  const registryPath = path.join(root, "SALIENCE_REGISTRY.json");
  if (!fs.existsSync(registryPath)) {
    console.error("FAIL missing SALIENCE_REGISTRY.json");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(registryPath, "utf8"));
}

function countFiltered(items, filter) {
  if (!filter) return items.length;
  return items.filter((item) => item[filter.field] === filter.equals).length;
}

function checkStandardsCanonical(standards) {
  const ids = new Set(standards.map((s) => s.id));
  const missing = CANONICAL_STANDARD_IDS.filter((id) => !ids.has(id));
  if (missing.length > 0) {
    console.error(`FAIL [international-standards] missing canonical IDs: ${missing.join(", ")}`);
    return false;
  }
  console.log(`OK  [international-standards] canonical IDs present (${CANONICAL_STANDARD_IDS.length})`);
  return true;
}

function checkDataFile(item, fileName, minRequired, filter) {
  if (fileName === "SALIENCE_REGISTRY.json") {
    const registry = readRegistry();
    const count = registry.items?.length ?? 0;
    if (count < minRequired) {
      console.error(
        `FAIL [${item.id}] SALIENCE_REGISTRY.json has ${count} items (min ${minRequired})`,
      );
      return false;
    }
    console.log(`OK  [${item.id}] SALIENCE_REGISTRY.json (${count} items)`);
    return true;
  }

  if (fileName === "editions.json") {
    const manifest = JSON.parse(fs.readFileSync(path.join(dataRoot, "editions.json"), "utf8"));
    const count = manifest.editions?.length ?? 0;
    if (count < minRequired) {
      console.error(`FAIL [${item.id}] editions.json has ${count} editions (min ${minRequired})`);
      return false;
    }
    console.log(`OK  [${item.id}] editions.json (${count} editions)`);
    return true;
  }

  const filePath = path.join(dataDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL [${item.id}] missing data file: ${fileName}`);
    return false;
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!Array.isArray(data)) {
    console.error(`FAIL [${item.id}] ${fileName} is not a JSON array`);
    return false;
  }

  const count = countFiltered(data, filter);
  if (count < minRequired) {
    console.error(
      `FAIL [${item.id}] ${fileName} has ${count} matching entries (min ${minRequired}) — user request would not show`,
    );
    return false;
  }

  console.log(`OK  [${item.id}] ${fileName} (${count} entries, min ${minRequired})`);

  if (item.id === "international-standards" && fileName === "standards.json") {
    return checkStandardsCanonical(data);
  }

  return true;
}

function checkSurface(item, surface) {
  const check = SURFACE_CHECKS[surface];
  if (!check) {
    console.error(`FAIL [${item.id}] unknown surface "${surface}" — add to SURFACE_CHECKS`);
    return false;
  }

  const filePath = path.join(root, check.file);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL [${item.id}] surface ${surface} — missing ${check.file}`);
    return false;
  }

  const content = fs.readFileSync(filePath, "utf8");
  if (!check.pattern.test(content)) {
    console.error(
      `FAIL [${item.id}] surface ${surface} — pattern not found in ${check.file}`,
    );
    return false;
  }

  console.log(`OK  [${item.id}] surface ${surface} (${check.file})`);
  return true;
}

function validateItem(item) {
  let ok = true;

  const minCount = item.min_count;
  const perFile =
    minCount && typeof minCount === "object" && !Array.isArray(minCount) ? minCount : null;

  for (const fileName of item.data_files ?? []) {
    const base = fileName.replace(/\.json$/, "");
    const minRequired = perFile ? (perFile[base] ?? 1) : (minCount ?? 1);
    const filter = item.count_filter && !perFile ? item.count_filter : undefined;
    ok = checkDataFile(item, fileName, minRequired, filter) && ok;
  }

  for (const surface of item.surfaces ?? []) {
    ok = checkSurface(item, surface) && ok;
  }

  return ok;
}

const registry = readRegistry();
let allOk = true;

console.log(`Salience registry: ${registry.items.length} user directives\n`);

for (const item of registry.items) {
  console.log(`— ${item.id}: "${item.user_request.slice(0, 60)}…"`);
  allOk = validateItem(item) && allOk;
  console.log("");
}

if (!allOk) {
  console.error("Salience validation failed. User-requested items would not show in the UI.");
  process.exit(1);
}

console.log("All salience checks passed.");
