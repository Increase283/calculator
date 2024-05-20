"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Solution } from "./solution";

const formSchema = z.object({
  answer: z.string().min(2, {
    message: "Ошибка ввода",
  }),
});

export const OpenaiTest = () => {
  const answerMutation = api.openai.getAnswer.useMutation({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    answerMutation.mutate({ query: values.answer });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дифференциальное уравнение</FormLabel>
                <FormControl>
                  <Input placeholder="Integrate[2x,x]" {...field} />
                </FormControl>
                <FormDescription>
                  Поле ввода дифференциального уравнения
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
      {answerMutation.data && <Solution answer={answerMutation.data.content} />}
      {/* {answerMutation.data} */}
    </>
  );
};
