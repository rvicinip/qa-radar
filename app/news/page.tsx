import { AppShell } from "@/components/layout/AppShell";
import { NewsPageClient } from "@/components/pages/NewsPageClient";
import { getNews, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default function NewsPage() {
  const news = withSourceNames(getNews(), buildSourceNameMap(getSources()));

  return (
    <AppShell title="News" tagline="Curated QA news with impact, suggested action and source citations">
      <NewsPageClient news={news} />
    </AppShell>
  );
}
