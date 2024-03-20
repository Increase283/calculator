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
    const {mutate:createEvent} = api.event.create.useMutation()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            date: new Date(`2024-03-${day}`)
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
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
                        <DialogTitle>Add event</DialogTitle>
                        <DialogDescription>
                            Here will be some events
                        </DialogDescription>
                    </DialogHeader>
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
                        <DialogClose asChild>
                            <Button type="submit">Submit</Button>
                        </DialogClose>
                    </DialogFooter>
                </Form>

            </form>

        </DialogContent>
    </Dialog>
}
