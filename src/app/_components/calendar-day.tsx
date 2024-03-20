import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/app/_components/ui/dialog"


export const CalendarDay = ({day}:{day:number}) => {
    return <Dialog>
    <DialogTrigger>
        <div key={day} className="text-center py-2 bg-muted rounded cursor-pointer">
            {day}
        </div>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Day {day}</DialogTitle>
        <DialogDescription>
          Here will be some events
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
}