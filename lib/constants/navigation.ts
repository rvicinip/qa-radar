export type NavItem = {
  href: string;
  label: string;
  icon: string;
  section?: "main" | "resources" | "governance" | "editions";
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", icon: "⌂", section: "main" },
  { href: "/standards", label: "Standards", icon: "⚖", section: "main" },
  { href: "/signal-board", label: "Signal Board", icon: "◎", section: "main" },
  { href: "/trends", label: "Trends", icon: "↗", section: "main" },
  { href: "/communities", label: "Communities", icon: "👥", section: "resources" },
  { href: "/news", label: "News", icon: "📰", section: "resources" },
  { href: "/best-practices", label: "Best Practices", icon: "✓", section: "resources" },
  { href: "/tools", label: "Tools", icon: "🔧", section: "resources" },
  { href: "/events", label: "Events", icon: "📅", section: "resources" },
  { href: "/learning-paths", label: "Learning Paths", icon: "🎓", section: "resources" },
  { href: "/sources", label: "Source Ledger", icon: "📋", section: "governance" },
  { href: "/changelog", label: "Change Log", icon: "📝", section: "governance" },
  { href: "/editions", label: "Editions", icon: "🗞", section: "editions" },
  { href: "/evolution", label: "Evolution", icon: "📈", section: "editions" },
];
