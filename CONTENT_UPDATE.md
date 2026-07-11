# QA Radar — content update checklist

## Monthly edition ritual (start of each month)

QA Radar publishes a new dated edition each month. At the start of the month:

1. **Generate** — `npm run new:edition -- <YYYY-MM> "<Label>" <YYYY-MM-01>` clones the current edition into `data/editions/<YYYY-MM>/`, carries forward still-open ecosystem items, and flips `current` in [`data/editions.json`](/srv/ai-ops/repos/qa-radar/data/editions.json).
2. **Curate** — edit `data/editions/<YYYY-MM>/*.json`: add the month's news/tools, advance trend `state` where warranted, archive stale items. Keep salience minimums (trends ≥15, news ≥12, signals ≥8, standards ≥12) and the canonical standard IDs.
3. **Ecosystem** — populate `data/editions/<YYYY-MM>/ecosystem.json` with ≥3 recommendations to improve AI-Ops / IntelliQuip QA, each linked to a signal via `source_ref`. Approved items get promoted to [`plans/WORKSPACE_IMPROVEMENTS_BACKLOG.md`](/srv/ai-ops/plans/WORKSPACE_IMPROVEMENTS_BACKLOG.md) and linked back with `backlog_id`.
4. **Log + validate** — add a `changelog.json` entry, then run `npm run validate:release` (exit 0) and `npm run build`.
5. **Verify evolution** — `/evolution` should show the new month's launches, trend shifts, and ecosystem moves vs. the previous edition.

## Format lock rule

**Content can change; format cannot.** Visual layout must match the approved screen mock between every enrich run, seed update, and deploy. Run `npm run validate:format` before every release. If format needs an intentional change, update [`qa-radar-screen-mock-2026-06-09.html`](/srv/ai-ops/runtime/qa-radar-screen-mock-2026-06-09.html) and [`styles/design-tokens.css`](/srv/ai-ops/repos/qa-radar/styles/design-tokens.css) together, then add a changelog entry tagged `format-lock` and refresh `token_file_sha256` in [`FORMAT_REGISTRY.json`](/srv/ai-ops/repos/qa-radar/FORMAT_REGISTRY.json).

## User salience rule

**Every user directive must appear in [`SALIENCE_REGISTRY.json`](/srv/ai-ops/repos/qa-radar/SALIENCE_REGISTRY.json) and pass `npm run validate:salience` before any content release.**

When Reinaldo asks for content, a feature, or a topic, it must:

1. **Show in the UI** — not backend-only or changelog-only.
2. **Stay visible** on future refreshes — registered with minimum counts and UI surfaces.
3. **Stay traceable** — `user_request` text says what was asked; `surfaces` says where it appears.

## Steps for every content update

1. **Register the request** — add or update an item in `SALIENCE_REGISTRY.json` (`id`, `user_request`, `surfaces`, `data_files`, `min_count`, `added`).
2. **Add or refresh data** — edit the JSON files listed in `data_files` (standards → `data/standards.json`; trends/news/signals → respective files).
3. **Wire the UI** — ensure each listed surface exists (home strip, nav link, dedicated page). Run `npm run validate:salience` to grep-check surfaces.
4. **Validate and build** — run `npm run validate:data && npm run validate:salience && npm run validate:format && npm run build` (all exit 0).
5. **Log the change** — add a row to `data/changelog.json` referencing the salience item `id`.

## Registered pillars (2026-06-09)

| ID | What was asked | Where it shows |
|----|----------------|----------------|
| `international-standards` | ISO/NIST/EU/OWASP/IEEE/WCAG/OECD norms for AI codegen & QA | Nav Standards, home `StandardsPreview`, `/standards`, footer count |
| `rich-content` | More trends, articles, signals | Home, `/trends`, `/news`, `/signal-board` |
| `user-salience-rule` | Everything requested must stay visible | Home “Your priorities”, `/salience` |

## Standards — core dataset (international-standards item)

International frameworks live in [`data/standards.json`](/srv/ai-ops/repos/qa-radar/data/standards.json) (minimum **12** entries). The home page always shows `StandardsPreview` immediately after the hero; sidebar has a permanent **Standards** nav item (`/standards`); footer reports `Standards coverage: N frameworks tracked`.

### Canonical standard IDs (always track)

| ID | Framework |
|----|-----------|
| `iso-42001` | ISO/IEC 42001 — AI management system |
| `iso-29119` | ISO/IEC/IEEE 29119 — Software testing |
| `nist-ai-rmf` | NIST AI Risk Management Framework |
| `eu-ai-act` | EU Artificial Intelligence Act |
| `owasp-llm-top10` | OWASP Top 10 for LLM Applications |
| `wcag-22` | WCAG 2.2 |
| `oecd-ai-principles` | OECD AI Principles |

Full list of 15 tracked frameworks: see `standards.json`. Related content also appears in best practices, trends, signals and news under `AI governance & standards`.

### Category tags

Each entry in `standards.json` uses one of: `governance` · `testing` · `security` · `accessibility` · `ai-codegen`

## Related files

- [`FORMAT_REGISTRY.json`](/srv/ai-ops/repos/qa-radar/FORMAT_REGISTRY.json) — format lock registry (mock reference, token file, required CSS variables, layout components)
- [`scripts/validate-format.mjs`](/srv/ai-ops/repos/qa-radar/scripts/validate-format.mjs) — format drift enforcement
- [`styles/design-tokens.css`](/srv/ai-ops/repos/qa-radar/styles/design-tokens.css) — single source for colors, spacing, radius, shadows
- [`SALIENCE_REGISTRY.json`](/srv/ai-ops/repos/qa-radar/SALIENCE_REGISTRY.json) — single source of truth for user directives
- [`scripts/validate-salience.mjs`](/srv/ai-ops/repos/qa-radar/scripts/validate-salience.mjs) — salience enforcement (data counts + UI surfaces + canonical standards)
- [`app/salience/page.tsx`](/srv/ai-ops/repos/qa-radar/app/salience/page.tsx) — traceability page (what you asked → where it shows)
