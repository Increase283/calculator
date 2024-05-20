import { OpenaiTest } from "./_components/openai-test";

export default async function Home() {
  return (
    <main className="relative flex flex-col items-center">
      {/* <Difur /> */}
      <OpenaiTest />
    </main>
  );
}
