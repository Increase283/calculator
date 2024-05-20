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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Ошибка ввода",
  }),
});

export const QueryForm = ({
  getAnswer,
}: {
  getAnswer: ({ query }: { query: string }) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    getAnswer({ query: values.query });
    // answerMutation.mutate({ query: values.answer });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="query"
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
      {/* {answerMutation.data} */}
    </>
  );
};
