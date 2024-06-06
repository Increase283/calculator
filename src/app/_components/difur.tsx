"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { api } from "@/trpc/react";
import Image from "next/image";
import { QueryForm } from "./query-form";
import { Solution } from "./solution";
import { Skeleton } from "./ui/skeleton";

export const Difur = () => {
  const answerMutation = api.openai.getAnswer.useMutation();
  const graphMutation = api.diffur.getAnswer.useMutation();
  //@ts-ignore
  const grapthUrl = graphMutation.data?.pods[1]?.subpods[0].img.src ?? "";
  return (
    <div className="flex flex-col items-center space-x-2">
      <QueryForm
        getAnswer={answerMutation.mutate}
        getGraph={graphMutation.mutate}
        isPending={answerMutation.isPending}
      />
      {answerMutation.isPending && (
        <div className="mt-10 w-full max-w-2xl">
          <h2 className="mb-2 text-xl font-bold">Решение:</h2>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      )}
      {answerMutation.data && (
        <Tabs defaultValue="solution" className="mt-4 w-full">
          <TabsList className="w-full">
            <TabsTrigger value="solution" className="w-full">
              Решение
            </TabsTrigger>
            <TabsTrigger value="graph" className="w-full">
              График
            </TabsTrigger>
          </TabsList>
          <TabsContent value="solution">
            <div className="mt-10 w-full max-w-2xl">
              <Solution answer={answerMutation.data} />
            </div>
          </TabsContent>
          <TabsContent value="graph" className="flex flex-col items-center">
            <Image src={grapthUrl} alt="график" height={600} width={600} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
