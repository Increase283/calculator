import { Calendar } from "./_components/calendar";

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <div className="mt-40 flex flex-col items-center">
        <Calendar />
      </div>
    </main>
  );
}
