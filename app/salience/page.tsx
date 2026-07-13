import { AppShell } from "@/components/layout/AppShell";
import { formatSurface, getSalienceRegistry } from "@/lib/salience/registry";

export default function SaliencePage() {
  const { items } = getSalienceRegistry();

  return (
    <AppShell
      title="Your priorities"
      tagline="What you asked for → where it shows in QA Radar"
    >
      <p className="mb-6 max-w-3xl text-sm text-[var(--ink-secondary)]">
        Every item below is registered in{" "}
        <code className="rounded bg-[var(--surface-2)] px-1">SALIENCE_REGISTRY.json</code>. Content
        updates must pass <code className="rounded bg-[var(--surface-2)] px-1">npm run validate:salience</code>{" "}
        so nothing you requested gets buried.
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.id} className="preview-card" id={item.id}>
            <div className="text-[11px] font-extrabold uppercase tracking-wide text-[var(--muted)]">
              {item.id} · added {item.added}
            </div>
            <h2 className="mt-1 text-base font-bold">You asked for</h2>
            <p className="mt-1 text-sm text-[var(--ink-secondary)]">{item.user_request}</p>
            <h3 className="mt-3 text-sm font-bold">Where it shows</h3>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-[var(--ink-secondary)]">
              {item.surfaces.map((surface) => (
                <li key={surface}>{formatSurface(surface)}</li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Data: {item.data_files.join(", ")} · min:{" "}
              {typeof item.min_count === "object"
                ? Object.entries(item.min_count)
                    .map(([k, v]) => `${k}≥${v}`)
                    .join(", ")
                : `≥${item.min_count}`}
            </p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
