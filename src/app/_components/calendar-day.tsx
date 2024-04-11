"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { api } from "@/trpc/react";

import { Passanger } from "./passanger";
import { ScrollArea } from "./ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

const formSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  date: z.date(),
});

export const CalendarDay = ({
  date,
  disabled,
}: {
  date: Date;
  disabled?: boolean;
}) => {
  const utils = api.useUtils();
  const { data: passangers } = api.passanger.getByDate.useQuery({
    date: date,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      date: date,
    },
  });
  const { mutate: createPassanger } = api.passanger.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.passanger.getByDate.refetch({ date: date });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createPassanger(values);
  }

  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        className="rounded bg-muted py-2 text-center duration-150 hover:bg-muted/60 disabled:cursor-not-allowed disabled:bg-muted/50"
      >
        {date.getDate()}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>
                <span className=" text-muted-foreground">Fly </span>
                {date.toDateString()}
              </DialogTitle>
            </DialogHeader>
            <div>
              {passangers?.length ? (
                <>
                  <h2 className="mb-2">Passengers</h2>
                  <ScrollArea className="h-64 rounded p-2 ring ring-muted">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Surname</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {passangers?.map((passanger) => (
                          <Passanger key={passanger.id} passanger={passanger} />
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </>
              ) : (
                <div className="text-center">There are no passangers yet.</div>
              )}
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter surname" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="w-full justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button type="submit">Buy</Button>
            </DialogFooter>
          </Form>
        </form>
      </DialogContent>
    </Dialog>
  );
};
