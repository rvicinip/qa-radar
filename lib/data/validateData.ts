import fs from "fs";
import path from "path";
import { DATA_FILES, editionsManifestSchema, ecosystemFileSchema } from "@/lib/schemas";

const dataRoot = path.join(process.cwd(), "data");
const editionsRoot = path.join(dataRoot, "editions");

function validateManifest(): { ok: boolean; editionIds: string[] } {
  const manifestPath = path.join(dataRoot, "editions.json");
  if (!fs.existsSync(manifestPath)) {
    console.error("Missing data/editions.json");
    return { ok: false, editionIds: [] };
  }
  try {
    const manifest = editionsManifestSchema.parse(
      JSON.parse(fs.readFileSync(manifestPath, "utf-8")),
    );
    let ok = true;
    for (const e of manifest.editions) {
      if (!fs.existsSync(path.join(editionsRoot, e.id))) {
        console.error(`FAIL manifest lists edition ${e.id} but folder is missing`);
        ok = false;
      }
    }
    console.log(`OK  editions.json (current=${manifest.current}, ${manifest.editions.length} editions)`);
    return { ok, editionIds: manifest.editions.map((e) => e.id) };
  } catch (error) {
    console.error("FAIL editions.json schema");
    console.error(error);
    return { ok: false, editionIds: [] };
  }
}

function validateEdition(editionId: string): boolean {
  let ok = true;
  const dir = path.join(editionsRoot, editionId);

  for (const [key, { file, schema }] of Object.entries(DATA_FILES)) {
    if (key === "ecosystem") continue;
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
      console.error(`FAIL [${editionId}] missing ${file}`);
      ok = false;
      continue;
    }
    try {
      schema.parse(JSON.parse(fs.readFileSync(filePath, "utf-8")));
      console.log(`OK  [${editionId}] ${key} (${file})`);
    } catch (error) {
      ok = false;
      console.error(`FAIL [${editionId}] ${key} (${file})`);
      console.error(error);
    }
  }

  const ecoPath = path.join(dir, "ecosystem.json");
  if (fs.existsSync(ecoPath)) {
    try {
      ecosystemFileSchema.parse(JSON.parse(fs.readFileSync(ecoPath, "utf-8")));
      console.log(`OK  [${editionId}] ecosystem (ecosystem.json)`);
    } catch (error) {
      ok = false;
      console.error(`FAIL [${editionId}] ecosystem (ecosystem.json)`);
      console.error(error);
    }
  }

  return ok;
}

function main(): void {
  const { ok: manifestOk, editionIds } = validateManifest();
  let hasError = !manifestOk;

  for (const id of editionIds) {
    if (!validateEdition(id)) hasError = true;
  }

  if (hasError) process.exit(1);
  console.log("All edition data files passed Zod validation.");
}

main();
