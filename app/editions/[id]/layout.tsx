import Link from "next/link";
import { getEditionMeta } from "@/lib/data/loader";

const SUB_NAV = [
  { href: "", label: "Cover" },
  { href: "/trends", label: "Trends" },
  { href: "/news", label: "News" },
  { href: "/signal-board", label: "Signal Board" },
  { href: "/standards", label: "Standards" },
  { href: "/tools", label: "Tools" },
  { href: "/best-practices", label: "Practices" },
  { href: "/communities", label: "Communities" },
  { href: "/events", label: "Events" },
  { href: "/learning-paths", label: "Learning Paths" },
  { href: "/sources", label: "Sources" },
  { href: "/changelog", label: "Changelog" },
];

export default async function EditionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meta = getEditionMeta(id);
  const base = `/editions/${id}`;

  return (
    <>
      <nav
        aria-label="Edition sections"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-1)",
          marginBottom: "var(--space-4)",
          paddingBottom: "var(--space-3)",
          borderBottom: "1px solid var(--line-subtle)",
        }}
      >
        {SUB_NAV.map((item) => (
          <Link
            key={item.href}
            href={`${base}${item.href}`}
            className="badge slate"
            style={{ textDecoration: "none", fontSize: "11px" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </>
  );
}
