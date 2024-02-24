import Image from "next/image";
import Link from "next/link";

export default function THeader() {
  return (
    <header className="p-5 flex items-center justify-between">
      <Link href={"/"}>
        <Image
          width={50}
          height={50}
          src="/img/logo/textualgames.webp"
          alt="Textual Games Logo"
        />
      </Link>
    </header>
  );
}
