import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { UserInfo } from "@/components/features";

import { ModeSwitcher } from "../mode-switcher";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function THeader() {
  return (
    <header className="flex items-center justify-between p-5 px-10">
      <Link
        href={"/"}
        className={cn(
          pressStart2P.className,
          "hidden text-sm sm:flex items-center gap-2"
        )}
      >
        <Image
          width={50}
          height={50}
          src={"/textual-games-logo.png"}
          alt="Textual Games Logo"
          priority
        />
        Textual Games
      </Link>
      <div className="flex gap-3">
        <ModeSwitcher />
        <UserInfo />
      </div>
    </header>
  );
}
