"use client";
import { api } from "@/trpc/react";
import { Solution } from "./solution";
import { QueryForm } from "./query-form";
import { Skeleton } from "./ui/skeleton";

export const Difur = () => {
  const answerMutation = api.openai.getAnswer.useMutation({});
  return (
    <div className="flex flex-col items-center space-x-2">
      <QueryForm getAnswer={answerMutation.mutate} />
      {answerMutation.isPending && (
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="mb-2 text-xl font-bold">Решение:</h2>
          <Skeleton className="h-[300px] w-[600px] rounded-lg" />
        </div>
      )}
      {answerMutation.data && (
        <div className="mt-10 w-[600px]">
          <h2 className="mb-2 text-xl font-bold">Решение:</h2>
          <Solution answer={answerMutation.data.content} />
        </div>
      )}
    </div>
  );
};
