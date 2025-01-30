import Image from "next/image";
import Link from "next/link";

import { UserInfo } from "@/components/features";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function THeader() {
  return (
    <header className="flex items-center justify-between p-5 px-10">
      <Link href={"/"} className="hidden text-sm sm:block">
        Textual Games
      </Link>
      <div className="flex gap-3">
        <ModeToggle />
        <UserInfo />
      </div>
    </header>
  );
}
