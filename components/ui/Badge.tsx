import type { ReactNode } from "react";

type BadgeTone = "green" | "cyan" | "amber" | "blue" | "rose" | "violet" | "slate";

export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: BadgeTone;
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}
