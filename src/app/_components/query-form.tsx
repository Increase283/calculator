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

const formSchema = z.object({
  diffur: z.string().min(2, {
    message: "Ошибка ввода",
  }),
});

export function QueryForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diffur: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
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
  );
}
