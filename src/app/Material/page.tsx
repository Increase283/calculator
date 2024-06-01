import { api } from "@/trpc/server";

export default async function MaterialPage() {
  const articles = await api.article.getArticles();
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td style={{ fontSize: "12px" }}>{article.title}</td>
              <td>{article.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
