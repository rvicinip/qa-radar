# QA Radar — Phase 1 static MVP

Evidence-based QA intelligence site: **Resources, Trends, Best Practices & Professional Communities**.

Stack: Next.js (App Router) · TypeScript strict · Tailwind CSS · JSON content · Zod validation · Fuse.js local search.

## Run locally

```bash
cd /srv/ai-ops/repos/qa-radar
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
firefox http://localhost:3000
# or
curl -I http://localhost:3000
```

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run validate:data` | Zod validation for all `data/` JSON + chained `validate:salience` |
| `npm run validate:salience` | Registry-driven salience checks (standards ≥12, UI surfaces, user directives) |
| `npm run validate:format` | Format lock — tokens, mock reference, layout components (no visual drift) |
| `npm run validate:release` | Chains validate:data + validate:salience + validate:format |
| `npm run validate:salient` | Alias for `validate:salience` (standards salience discipline) |
| `npm run test:a11y` | Basic axe-core smoke on sample layout HTML |
| `npm run new:edition -- <YYYY-MM> "<Label>" <date>` | Clone current edition into a new month + set it current |

## Routes (Phase 1)

- `/` — Home dashboard (hero, **standards strip**, status row, Signal Board preview, trends snapshot, featured previews, digest)
- `/standards` — International standards index (ISO, NIST, EU AI Act, OWASP, IEEE, WCAG, OECD…)
- `/signal-board` — Full 7-column Kanban (not a 4-ring radar)
- `/trends` — Trend matrix + searchable list
- `/communities`, `/news`, `/best-practices`, `/tools`, `/events`, `/learning-paths`
- `/sources` — Source ledger
- `/changelog` — Editorial change log
- `/salience` — User priority traceability (what you asked → where it shows)
- `/editions` — Monthly edition index (browse every published month)
- `/editions/[id]` — Per-month cover: highlights + **Improve our ecosystem** recommendations
- `/evolution` — Month-over-month diff (launches, retired, trend shifts, ecosystem moves)

## Monthly editions

QA Radar is a **consultable monthly newspaper**. Each month is a frozen, dated edition under `data/editions/<YYYY-MM>/`; the manifest [`data/editions.json`](/srv/ai-ops/repos/qa-radar/data/editions.json) names the `current` edition. The loader defaults to `current`, so the live site always shows the newest month while past months stay browsable exactly as published.

**Start a new month** (run at the beginning of each month):

```bash
npm run new:edition -- 2026-08 "August 2026" 2026-08-01
```

This clones the current edition, carries forward still-open ecosystem items, and flips `current`. Then curate `data/editions/2026-08/*.json`, populate `ecosystem.json` (≥3 recommendations), and run `npm run validate:release`.

**Evolution:** `/evolution` compares the current edition against the previous one — new items, retired items, trend state shifts, and ecosystem moves — all derived from the data by [`lib/evolution/diff.ts`](/srv/ai-ops/repos/qa-radar/lib/evolution/diff.ts) (unit-tested).

**Ecosystem pillar:** each edition's `ecosystem.json` holds recommendations to improve **our own ecosystem** (AI-Ops / IntelliQuip QA), derived from that month's signals. QA Radar is the discovery layer; approved items are promoted to [`plans/WORKSPACE_IMPROVEMENTS_BACKLOG.md`](/srv/ai-ops/plans/WORKSPACE_IMPROVEMENTS_BACKLOG.md) (the single executor) and linked back via `backlog_id`.

## Content

Edition JSON lives in `data/editions/<YYYY-MM>/` (originally seeded from `runtime/qa-radar-execution-package/04_data_seed/`). Edit JSON by hand; run `npm run validate:data` before commit — it validates every edition folder.

**User salience rule:** Every directive from Reinaldo is registered in [`SALIENCE_REGISTRY.json`](/srv/ai-ops/repos/qa-radar/SALIENCE_REGISTRY.json) with UI surfaces and minimum counts. Run `npm run validate:salience` before release — see [`CONTENT_UPDATE.md`](/srv/ai-ops/repos/qa-radar/CONTENT_UPDATE.md).

**Format lock rule:** Visual layout must stay identical to the approved screen mock between enrich runs, seed updates, and deploys. All colors, spacing, radius, and shadows flow from [`styles/design-tokens.css`](/srv/ai-ops/repos/qa-radar/styles/design-tokens.css) (canonical reference: [`qa-radar-screen-mock-2026-06-09.html`](/srv/ai-ops/runtime/qa-radar-screen-mock-2026-06-09.html)). Run `npm run validate:format` before release; Vercel build chains it automatically. Intentional format changes require updating mock + tokens + changelog together.

**Standards (international-standards item):** Core dataset [`data/standards.json`](/srv/ai-ops/repos/qa-radar/data/standards.json) — home `StandardsPreview`, nav **Standards** (`/standards`), footer coverage line. Related content also in best practices, trends, signals and news.

## Deploy

Configured for **Vercel** (`vercel.json`). Also works on **Netlify** with build command `npm run validate:data && npm run validate:salience && npm run validate:format && npm run build` and publish directory `.next` (Next.js adapter) or use Netlify Next plugin.

## Phase 1 limitations

No backend, database, login, CMS, RSS/scraping, in-app AI, or multi-user editing.

## Phase 2 ideas

- Automated news/event ingestion with human review queue
- CMS or git-based editorial workflow UI
- User accounts and saved filters
- Bridge deep integration and newsletter send

## Spec source

Read-only package: [`/srv/ai-ops/runtime/qa-radar-execution-package/`](/srv/ai-ops/runtime/qa-radar-execution-package/)

Screen mock reference: [`/srv/ai-ops/runtime/qa-radar-screen-mock-2026-06-09.html`](/srv/ai-ops/runtime/qa-radar-screen-mock-2026-06-09.html)
