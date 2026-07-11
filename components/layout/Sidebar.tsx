"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants/navigation";

export function Sidebar({
  editions,
  current,
}: {
  editions: { id: string; label: string }[];
  current: string;
}) {
  const pathname = usePathname();

  const sections = [
    { key: "main", label: "Main" },
    { key: "resources", label: "Resources" },
    { key: "governance", label: "Governance" },
    { key: "editions", label: "Editions" },
  ] as const;

  return (
    <aside className="sidebar" aria-label="Section navigation">
      <div className="brand">
        <span className="glyph" aria-hidden="true">
          📡
        </span>
        <div>
          <strong>QA Radar</strong>
          <small>Professional QA intelligence</small>
        </div>
      </div>

      <div className="nav-label">Edition</div>
      <nav aria-label="Edition selector" style={{ marginBottom: "var(--space-4)" }}>
        {editions.map((e) => (
          <Link
            key={e.id}
            href={`/editions/${e.id}`}
            className={`nav-item${e.id === current ? " active" : ""}`}
          >
            <span className="ic" aria-hidden="true">📅</span>
            {e.label}
          </Link>
        ))}
      </nav>

      {sections.map(({ key, label }) => (
        <div key={key}>
          <div className="nav-label">{label}</div>
          {NAV_ITEMS.filter((item) => item.section === key).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`nav-item${active ? " active" : ""}`}
              >
                <span className="ic" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
