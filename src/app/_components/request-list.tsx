"use client";
import { formatDate } from "@/utils/formatDate";
import { type Request } from "@prisma/client";
import "katex/dist/katex.min.css";
import { useState } from "react";
import Latex from "react-latex-next";

export const RequestList = ({ requests }: { requests: Request[] }) => {
  const [activeRequest, setActiveRequest] = useState<null | Request>(null);

  return (
    <div className="w-screen">
      <div className="fixed h-[95vh] w-72 overflow-y-auto border-r">
        <ul>
          {requests.map((request) => (
            <li
              key={request.id}
              className="cursor-pointer px-4 py-2 hover:bg-secondary"
              onClick={() => setActiveRequest(request)}
            >
              {request.input}
            </li>
          ))}
        </ul>
      </div>
      <div className="ml-72 p-4">
        {activeRequest ? (
          <div>
            <h1 className="mb-2 text-xl font-bold">{activeRequest.input}</h1>

            {activeRequest.solution ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {formatDate(activeRequest.createdAt)}
                </p>
                <Latex>{activeRequest.solution}</Latex>
              </>
            ) : (
              <p>У этой статьи пока нет текста</p>
            )}
          </div>
        ) : (
          <p>Выберите запрос</p>
        )}
      </div>
    </div>
  );
};
