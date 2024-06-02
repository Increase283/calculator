import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export const Header = () => {
  return (
    <header className="border-bottom container sticky top-0 z-10 flex justify-between border-b bg-background/20 py-2 backdrop-blur-sm">
      <a href="/">
        <Image src="/Logo.png" width={60} height={60} alt="logo" />
      </a>
      <div className="flex items-center space-x-10">
        <div>
          <Link href="/" className="duration-150 hover:text-primary/50">
            Калькулятор
          </Link>
        </div>
        <div>
          <Link href="/material" className="duration-150 hover:text-primary/50">
            Полезные материалы
          </Link>
        </div>
        <div>
          <Link href="/guide" className="duration-150 hover:text-primary/50">
            Руководство пользователя
          </Link>
        </div>
        <div>
          <Link href="/request" className="duration-150 hover:text-primary/50">
            История запросов
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
};
