"use client";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { type Article } from "@prisma/client";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export const ArticleList = ({ articles }: { articles: Article[] }) => {
  const [activeArticle, setActiveArticle] = useState<null | Article>(null);

  return (
    <div className="w-screen">
      <div className="fixed h-[95vh] w-72 overflow-y-auto border-r">
        <ul>
          {articles.map((article) => (
            <li
              key={article.id}
              className="cursor-pointer px-4 py-2 hover:bg-secondary"
              onClick={() => setActiveArticle(article)}
            >
              {article.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-72 p-4">
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
