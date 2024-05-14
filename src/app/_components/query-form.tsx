"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  diffur: z.string().min(2, {
    message: "Ошибка ввода",
  }),
});

export function QueryForm() {
  const diffurMutation = api.diffur.getAnswer.useMutation({});
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diffur: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await diffurMutation.mutateAsync({ query: values.diffur });
    console.log(diffurMutation.data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="diffur"
            render={({ field }) => (
              <FormItem>
                <FormLabel>диффур</FormLabel>
                <FormControl>
                  <Input placeholder="Integrate[2x,x]" {...field} />
                </FormControl>
                <FormDescription>Сюда вводите ваш диффур</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Отправить</Button>
        </form>
      </Form>
      <div>
        {diffurMutation.data?.inputstring}
        <img
          src={diffurMutation.data?.pods[0]?.subpods[0]?.img.src}
          alt="Ничего нет"
        />
        {/* <pre>{JSON.stringify(diffurMutation.data)}</pre> */}
      </div>
    </>
  );
}
