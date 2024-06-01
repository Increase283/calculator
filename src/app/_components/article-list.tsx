"use client";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { type Article } from "@prisma/client";
import { useState } from "react";

export const ArticleList = ({ articles }: { articles: Article[] }) => {
  const [activeArticle, setActiveArticle] = useState<null | Article>(null);

  return (
    <div className="flex h-[calc(100vh-100px)] w-full">
      <div
        className="w-1/4 overflow-y-auto border-r"
        style={{ maxHeight: "100vh" }}
      >
        <ul>
          {articles.map((article) => (
            <li
              key={article.id}
              className="cursor-pointer p-2 hover:bg-secondary"
              onClick={() => setActiveArticle(article)}
            >
              {article.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 overflow-y-auto p-4" style={{ maxHeight: "100vh" }}>
        {activeArticle ? (
          <div>
            <h1 className="mb-2 text-xl font-bold">{activeArticle.title}</h1>
            {activeArticle.content ? (
              <Latex>{activeArticle.content}</Latex>
            ) : (
              <p>У этой статьи пока нет текста</p>
            )}
          </div>
        ) : (
          <p>Выберите статью чтобы прочесть</p>
        )}
      </div>
    </div>
  );
};
