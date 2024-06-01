import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <header className="border-bottom container sticky flex justify-between bg-background/20 py-2 backdrop-blur-sm">
      <div className="image-container">
        <a href="/">
          <img src="/Logo.png" width="60" />
        </a>
      </div>
      <div>
        <Link href="/">Калькулятор</Link>
      </div>
      <div>
        <Link href="/Material">Полезные материалы</Link>
      </div>
      <div>
        <Link href="/uguide">Руководство пользователя</Link>
      </div>
      <div className="flex items-center gap-x-4">
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
};
