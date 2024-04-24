import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <header className="border-bottom container sticky flex justify-end gap-x-4 bg-background/20 py-2 backdrop-blur-sm">
      <ModeToggle />
      <UserButton />
    </header>
  );
};
