import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle/mode-toggle";

export default function THeader() {
  return (
    <header className="flex items-center justify-between p-5 px-10">
      <Link href={"/"}>
        <Image
          width={70}
          height={70}
          src="/img/logo/textual-games-logo.png"
          alt="Textual Games Logo"
          className="bg-white"
        />
      </Link>
      <ModeToggle />
    </header>
  );
}
