import { Press_Start_2P } from "next/font/google";
import Link from "next/link";

import { UserInfo } from "@/components/features";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function THeader() {
  return (
    <header className="flex items-center justify-between p-5 px-10">
      <Link
        href={"/"}
        className={cn(pressStart2P.className, "hidden text-sm sm:block")}
      >
        Textual Games
      </Link>
      <div className="flex gap-3">
        <ModeToggle />
        <UserInfo />
      </div>
    </header>
  );
}
