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
import { BoltIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";
import { Spinner } from "./ui/spinner";

type DiffurOperator = {
  value: string;
  title: string;
};

const diffurOperators: DiffurOperator[] = [
  { value: "integrate[x,x]", title: "Неопределённый интеграл" },
  { value: "Integrate[2x,{x,1,2}]", title: "Определённый интеграл" },
  { value: "Limit[x,x->0]", title: "Предел" },
  { value: "D[y,x]", title: "Производная" },
];

const formSchema = z.object({
  query: z.string().min(2, {
    message: "Ошибка ввода",
  }),
});

export const QueryForm = ({
  getAnswer,
  getGraph,
  isPending,
}: {
  getAnswer: ({ query }: { query: string }) => void;
  getGraph: ({ query }: { query: string }) => void;
  isPending: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const addOperator = (value: string) => {
    form.setValue("query", form.getValues().query + value);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    getAnswer({ query: values.query });
    getGraph({ query: values.query });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
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
          <ScrollArea className="h-[100px]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
              {diffurOperators.map((diffurOperator) => (
                <Button
                  key={diffurOperator.title}
                  type="button"
                  variant={"secondary"}
                  onClick={() => addOperator(diffurOperator.value)}
                >
                  {diffurOperator.title}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <div className=" w-full max-w-xs self-center">
            <Button
              type="submit"
              className="w-full space-x-2"
              size={"lg"}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Spinner />
                  <span>Решается...</span>
                </>
              ) : (
                <>
                  <BoltIcon className="h-4 w-4" />
                  <span>Решить</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
