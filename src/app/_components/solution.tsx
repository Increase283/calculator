"use client";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

export const Solution = ({ answer }: { answer: string }) => {
  return (
    <div className="pb-6">
     <Latex>{answer}</Latex>
    </div>
  );
};
