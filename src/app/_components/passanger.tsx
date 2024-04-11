import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { type Passanger as PassangerType } from "@prisma/client";
import { TableCell, TableRow } from "./ui/table";

export const Passanger = ({ passanger }: { passanger: PassangerType }) => {
  const utils = api.useUtils();
  const { mutate: deleteEvent } = api.passanger.delete.useMutation({
    onSuccess: async () => {
      await utils.passanger.getByDate.refetch({ date: passanger.date });
    },
  });

  const deletePassangerHandler = () => {
    deleteEvent({ id: passanger.id });
  };
  return (
    <TableRow>
      <TableCell>{passanger.name}</TableCell>
      <TableCell>{passanger.surname}</TableCell>
      <TableCell className="w-4">
        <Button
          variant={"ghost"}
          size={"icon"}
          type="button"
          onClick={deletePassangerHandler}
        >
          <Cross1Icon />
        </Button>
      </TableCell>
    </TableRow>
  );
};
