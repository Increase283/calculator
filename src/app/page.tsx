import { UserButton } from "@clerk/nextjs";
import { Calendar } from "./_components/calendar";
import { ModeToggle } from "./_components/mode-toggle";

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="fixed left-5 top-5">
        <UserButton />
      </div>
      <div className="mt-40 flex flex-col items-center">
        <Calendar />
      </div>
      <div className="fixed bottom-5 left-5">
        <ModeToggle />
      </div>
    </main>
  );
}
