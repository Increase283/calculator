"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/_components/ui/dialog"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import {z} from "zod"

import {Button} from "@/app/_components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/_components/ui/form"
import {Input} from "@/app/_components/ui/input"
import {api} from "@/trpc/react";
import { Skeleton } from "./ui/skeleton"


const formSchema = z.object({
    name: z.string().min(1),
    date: z.date()
})

export const CalendarDay = ({day}: { day: number }) => {
    const utils = api.useUtils()
    const {data: events, isError, isFetching} = api.event.getByDate.useQuery({date: new Date(`2024-03-${day}`)})
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            date: new Date(`2024-03-${day}`)
        },
    })
    const {mutate:createEvent} = api.event.create.useMutation({
        onSuccess: async () => {
            form.reset()
            await utils.event.getByDate.refetch({date: new Date(`2024-03-${day}`)})
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        createEvent(values)
    }

    return <Dialog>
        <DialogTrigger>
            <div key={day} className="text-center py-2 bg-muted hover:bg-muted/60 duration-150 rounded cursor-pointer">
                {day}
            </div>
        </DialogTrigger>
        <DialogContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Form {...form}>
                    <DialogHeader>
                        <DialogTitle>Events:</DialogTitle>
                    </DialogHeader>
                    <div>
                        {isError ? <div>Error</div>
                        :<div>
                            {events?.map((event) => (
                                <div key={event.id} className="text-wrap">{event.name}</div>
                            ))}
                        </div>
                        }
                        { isFetching && <Skeleton className="w-[100px] h-[20px] rounded-full" />}

                    </div>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Event name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter event name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <DialogFooter className="justify-end w-full">
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
}
