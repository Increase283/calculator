import { api } from "@/trpc/server";
import { ArticleList } from "../_components/article-list";

export default async function MaterialPage() {
  const articles = await api.article.getArticles();

  return (
    <div className="flex">
      <ArticleList articles={articles} />
    </div>
  );
}
