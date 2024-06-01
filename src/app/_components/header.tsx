import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="border-bottom container sticky flex justify-between bg-background/20 py-2 backdrop-blur-sm">
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
          <Link href="/uguide" className="duration-150 hover:text-primary/50">
            Руководство пользователя
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
