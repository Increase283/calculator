"use client";
import { api } from "@/trpc/react";

export const Solution = () => {
  const difurMutation = api.diffur.getAnswer.useMutation();
  return <div>{difurMutation.data?.inputstring}</div>;
};
