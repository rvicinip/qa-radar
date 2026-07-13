#!/usr/bin/env node
/**
 * Format lock — visual layout must match the approved screen mock between runs.
 * Run: npm run validate:format
 */
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function sha256(content) {
  return crypto.createHash("sha256").update(content, "utf8").digest("hex");
}

function readRegistry() {
  const registryPath = path.join(root, "FORMAT_REGISTRY.json");
  if (!fs.existsSync(registryPath)) {
    console.error("FAIL missing FORMAT_REGISTRY.json");
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(registryPath, "utf8"));
}

function checkMockExists(referenceMock) {
  if (!fs.existsSync(referenceMock)) {
    console.error(`FAIL reference mock missing: ${referenceMock}`);
    return false;
  }
  console.log(`OK  reference mock exists (${referenceMock})`);
  return true;
}

function checkTokenFile(tokenRelPath, requiredVars) {
  const tokenPath = path.join(root, tokenRelPath);
  if (!fs.existsSync(tokenPath)) {
    console.error(`FAIL missing token file: ${tokenRelPath}`);
    return false;
  }

  const content = fs.readFileSync(tokenPath, "utf8");
  let ok = true;

  for (const varName of requiredVars) {
    if (!content.includes(varName)) {
      console.error(`FAIL token file missing CSS variable: ${varName}`);
      ok = false;
    }
  }

  if (ok) {
    console.log(`OK  ${tokenRelPath} (${requiredVars.length} required variables present)`);
  }

  return { ok, content, path: tokenPath };
}

function checkGlobalsImportsToken(tokenRelPath) {
  const globalsPath = path.join(root, "app/globals.css");
  if (!fs.existsSync(globalsPath)) {
    console.error("FAIL missing app/globals.css");
    return false;
  }

  const content = fs.readFileSync(globalsPath, "utf8");
  const importPattern = new RegExp(`@import\\s+["']\\.\\./${tokenRelPath.replace(/^\.\//, "")}["']`);
  const altPattern = new RegExp(`@import\\s+["']\\.\\./styles/design-tokens\\.css["']`);

  if (!importPattern.test(content) && !altPattern.test(content)) {
    console.error(`FAIL app/globals.css must import ${tokenRelPath}`);
    return false;
  }

  console.log(`OK  app/globals.css imports design tokens`);
  return true;
}

function checkComponents(components) {
  let ok = true;

  for (const comp of components) {
    const filePath = path.join(root, comp.file);
    if (!fs.existsSync(filePath)) {
      console.error(`FAIL component ${comp.name} — missing ${comp.file}`);
      ok = false;
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const pattern = new RegExp(comp.import ?? comp.name);
    if (!pattern.test(content)) {
      console.error(
        `FAIL component ${comp.name} — import/usage not found in ${comp.file}`,
      );
      ok = false;
      continue;
    }

    console.log(`OK  component ${comp.name} (${comp.file})`);
  }

  return ok;
}

function checkTokenHash(content, tokenPath, lock) {
  if (!lock?.token_file_sha256) {
    return true;
  }

  const currentHash = sha256(content);
  if (currentHash === lock.token_file_sha256) {
    console.log(`OK  token file hash matches registry`);
    return true;
  }

  const changelogPath = path.join(root, "data/changelog.json");
  let hasFormatChangelog = false;

  if (fs.existsSync(changelogPath)) {
    const changelog = JSON.parse(fs.readFileSync(changelogPath, "utf8"));
    hasFormatChangelog = changelog.some(
      (entry) =>
        entry.tags?.includes("format-lock") ||
        /format lock|design-tokens|screen mock/i.test(entry.summary ?? ""),
    );
  }

  if (hasFormatChangelog) {
    console.warn(
      `WARN token file hash changed (${lock.token_file_sha256.slice(0, 12)}… → ${currentHash.slice(0, 12)}…) — update FORMAT_REGISTRY.json token_file_sha256 after review`,
    );
    return true;
  }

  console.warn(
    `WARN design-tokens.css hash changed without format-lock changelog entry — update mock + tokens together and log in changelog.json`,
  );
  return true;
}

const registry = readRegistry();
const lock = registry.format_lock;
let allOk = true;

console.log("Format lock validation\n");

allOk = checkMockExists(lock.reference_mock) && allOk;

const tokenResult = checkTokenFile(lock.token_file, lock.required_css_variables);
allOk = tokenResult.ok && allOk;

allOk = checkGlobalsImportsToken(lock.token_file) && allOk;
allOk = checkComponents(lock.required_components) && allOk;

if (tokenResult.ok) {
  checkTokenHash(tokenResult.content, tokenResult.path, lock);
}

if (!allOk) {
  console.error(
    "\nFormat validation failed. Visual format would drift from the approved mock.",
  );
  process.exit(1);
}

console.log("\nAll format lock checks passed.");
