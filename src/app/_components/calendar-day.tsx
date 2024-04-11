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
import { Skeleton } from "./ui/skeleton";

import { Event } from "./event";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
  date: z.date(),
});

export const CalendarDay = ({
  day,
  disabled,
}: {
  day: number;
  disabled?: boolean;
}) => {
  const utils = api.useUtils();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const { data: events, isError } = api.event.getByDate.useQuery({
    date: new Date(`2024-03-${day}`),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: new Date(`2024-03-${day}`),
    },
  });
  const { mutate: createEvent } = api.event.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.event.getByDate.refetch({ date: new Date(`2024-03-${day}`) });
      setIsCreatingEvent(false);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreatingEvent(true);
    createEvent(values);
  }

  return (
    <Dialog>
      <DialogTrigger
        disabled={disabled}
        className="rounded bg-muted py-2 text-center duration-150 hover:bg-muted/60 disabled:cursor-not-allowed disabled:bg-muted/50"
      >
        {day}
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Form {...form}>
            <DialogHeader>
              <DialogTitle>Events:</DialogTitle>
            </DialogHeader>
            <div>
              {!events?.length && (
                <div className="text-center">There are no events yet.</div>
              )}
              {isError ? (
                <div>Error</div>
              ) : (
                <div className=" divide-y">
                  {events?.map((event) => (
                    <Event key={event.id} event={event} />
                  ))}
                </div>
              )}
              {isCreatingEvent && (
                <Skeleton className="h-[20px] w-[100px] rounded-full" />
              )}
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event name" {...field} />
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
              <Button type="submit">Add event</Button>
            </DialogFooter>
          </Form>
        </form>
      </DialogContent>
    </Dialog>
  );
};
