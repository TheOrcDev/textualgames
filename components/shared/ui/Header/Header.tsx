import Image from "next/image";
import Link from "next/link";

export default function THeader() {
  return (
    <header className="flex items-center justify-between p-5">
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
