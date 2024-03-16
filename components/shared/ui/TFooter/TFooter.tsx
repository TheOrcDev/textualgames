import Image from "next/image";

export default function Footer() {
  return (
    <footer className="fixed bottom-5 left-5 flex items-center gap-2 text-xs">
      <Image
        src="/img/logo/textualgameslogolight.png"
        alt="logo"
        className="w-auto shadow-md"
        width={20}
        height={20}
      />
      <h2>Textual Games</h2>
    </footer>
  );
}
