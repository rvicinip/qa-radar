import Link from "next/link";
import { formatSurface, getSalienceRegistry } from "@/lib/salience/registry";

export function YourPrioritiesStrip() {
  const { items } = getSalienceRegistry();
  const tracked = items.filter((item) => item.id !== "user-salience-rule");

  return (
    <section className="accent-strip" aria-labelledby="your-priorities">
      <div className="section-head" style={{ marginBottom: "var(--space-2)" }}>
        <h3 id="your-priorities" style={{ fontSize: "0.92rem" }}>
          Your priorities
        </h3>
        <Link href="/salience" className="hint no-underline hover:underline">
          Full traceability →
        </Link>
      </div>
      <p className="sum">
        {items.length} user directives tracked — each must stay visible on every update.
      </p>
      <ul style={{ marginTop: "var(--space-2)", paddingLeft: "1.25rem", fontSize: "0.84rem" }}>
        {tracked.slice(0, 3).map((item) => (
          <li key={item.id} style={{ color: "var(--ink-secondary)", marginBottom: "4px" }}>
            <span style={{ fontWeight: 600, color: "var(--ink)" }}>{item.user_request.slice(0, 72)}</span>
            <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
              {" "}
              → {item.surfaces.slice(0, 2).map(formatSurface).join(", ")}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
