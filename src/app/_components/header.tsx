import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <header className="container flex justify-end gap-x-4 py-2">
      <ModeToggle />
      <UserButton />
    </header>
  );
};
