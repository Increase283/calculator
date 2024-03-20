"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
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


const formSchema = z.object({
    name: z.string(),
    date: z.date()
})

export const CalendarDay = ({day}: { day: number }) => {
    const {data: events, isError} = api.event.getByDate.useQuery({date: new Date(`2024-03-${day}`)})
    const {mutate:createEvent, isPending} = api.event.create.useMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            date: new Date(`2024-03-${day}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createEvent(values)
        form.reset()
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
                        <DialogTitle>Add event</DialogTitle>
                    </DialogHeader>
                    <div className="font-bold">Events:</div>
                    <div>
                        {isPending && <div>Loading...</div>}
                        {isError ? <div>Error</div>
                        :<div>
                            {events?.map((event) => (
                                <div key={event.id}>{event.name}</div>
                            ))}
                        </div>
                        }
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
                        <Button type="submit">Submit</Button>
                    </DialogFooter>
                </Form>

            </form>

        </DialogContent>
    </Dialog>
}
