"use client";
import { type Guide } from "@prisma/client";
import "katex/dist/katex.min.css";
import { useState } from "react";
import Latex from "react-latex-next";

export const GuideList = ({ guides }: { guides: Guide[] }) => {
  const [activeGuide, setActiveGuide] = useState<null | Guide>(null);

  return (
    <div className="w-screen">
      <div className="fixed h-[95vh] w-72 overflow-y-auto border-r">
        <ul>
          {guides.map((guide) => (
            <li
              key={guide.id}
              className="cursor-pointer px-4 py-2 hover:bg-secondary"
              onClick={() => setActiveGuide(guide)}
            >
              {guide.element}
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-72 p-4">
        {activeGuide ? (
          <div>
            <h1 className="mb-2 text-xl font-bold">{activeGuide.element}</h1>
            {activeGuide.description ? (
              <Latex>{activeGuide.description}</Latex>
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
