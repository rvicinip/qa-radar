#!/usr/bin/env node
/**
 * Create the next monthly QA Radar edition by cloning the current one.
 * Usage: node scripts/new-edition.mjs 2026-07 "July 2026" 2026-07-01
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataRoot = path.join(root, "data");
const editionsRoot = path.join(dataRoot, "editions");

const [, , id, label, published] = process.argv;

if (!id || !/^\d{4}-\d{2}$/.test(id)) {
  console.error('Usage: node scripts/new-edition.mjs <YYYY-MM> "<Label>" <published-date>');
  process.exit(1);
}

const manifestPath = path.join(dataRoot, "editions.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

if (manifest.editions.some((e) => e.id === id)) {
  console.error(`Edition ${id} already exists.`);
  process.exit(1);
}

const fromId = manifest.current;
const fromDir = path.join(editionsRoot, fromId);
const toDir = path.join(editionsRoot, id);

fs.mkdirSync(toDir, { recursive: true });
for (const file of fs.readdirSync(fromDir)) {
  fs.copyFileSync(path.join(fromDir, file), path.join(toDir, file));
}

// Carry forward still-open ecosystem items; drop resolved ones for a fresh month.
const ecoPath = path.join(toDir, "ecosystem.json");
if (fs.existsSync(ecoPath)) {
  const eco = JSON.parse(fs.readFileSync(ecoPath, "utf8"));
  const open = eco.filter((i) => i.status === "proposed" || i.status === "promoted");
  fs.writeFileSync(ecoPath, JSON.stringify(open, null, 2) + "\n");
} else {
  fs.writeFileSync(ecoPath, "[]\n");
}

manifest.editions.push({ id, label: label ?? id, published: published ?? id + "-01" });
manifest.current = id;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

console.log(`Created edition ${id} (cloned from ${fromId}) and set it as current.`);
console.log("Next steps:");
console.log(`  1. Curate data/editions/${id}/*.json (news, tools, trend states).`);
console.log(`  2. Add ecosystem recommendations to data/editions/${id}/ecosystem.json.`);
console.log("  3. Run: npm run validate:release");
