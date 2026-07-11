import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getEditions, getCurrentEditionId } from "@/lib/data/loader";

export function AppShell({
  title,
  tagline,
  children,
}: {
  title: string;
  tagline?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="app">
      <Sidebar editions={getEditions()} current={getCurrentEditionId()} />
      <main className="main">
        <div className="topbar">
          <div>
            <h1>{title}</h1>
            {tagline ? <p className="tagline">{tagline}</p> : null}
          </div>
          <div className="topbar-actions">
            <ThemeToggle />
          </div>
        </div>
        {children}
        <Footer />
      </main>
    </div>
  );
}
