import { AppShell } from "@/components/layout/AppShell";
import { NewsPageClient } from "@/components/pages/NewsPageClient";
import { getNews, getSources } from "@/lib/data/loader";
import { buildSourceNameMap, withSourceNames } from "@/lib/data/source-names";

export default async function EditionNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = withSourceNames(getNews(id), buildSourceNameMap(getSources(id)));

  return (
    <AppShell title="News" tagline="Curated QA news — releases, standards updates, and community developments">
      <NewsPageClient news={news} />
    </AppShell>
  );
}
