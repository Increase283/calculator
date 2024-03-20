import {UserButton} from "@clerk/nextjs";
import {Calendar} from "./_components/calendar";
import {ModeToggle} from "./_components/mode-toggle";

export default async function Home() {
    return (
        <main className="min-h-screen flex flex-col relative">
            <div className="fixed top-5 left-5">
                <UserButton/>
            </div>
            <Calendar/>
            <div className="fixed left-5 bottom-5">
                <ModeToggle/>
            </div>

        </main>
    );
}
