import { QueryForm } from "./_components/query-form";

export default async function Home() {
  return (
    <main className="relative flex flex-col items-center">
      <div>
        <QueryForm />
      </div>
    </main>
  );
}
