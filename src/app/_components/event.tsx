import { type Event as EventType } from "@prisma/client"
import { Cross1Icon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import { api } from "@/trpc/react"


export const Event = ({event}: {event:EventType}) => {
    const utils = api.useUtils()
    const {mutate: deleteEvent} = api.event.delete.useMutation({
        onSuccess: async () => {
            await utils.event.getByDate.refetch({date: event.date})
        }
    })

    const deleteEventHandler = () => {
        deleteEvent({id: event.id})
    }
    return <div className="p-2 flex justify-between items-center">
        <div>{event.name}</div>
        <Button variant={"ghost"} size={"icon"} type="button" onClick={deleteEventHandler}><Cross1Icon/></Button>
    </div>
}