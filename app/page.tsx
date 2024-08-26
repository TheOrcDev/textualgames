import { Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";

export default function PlayPage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-white bg-grid-black/[0.2] dark:bg-black dark:bg-grid-white/[0.2]">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-4xl font-bold text-transparent sm:text-7xl">
        Textual Games
      </p>
      <Link href={"/play"}>
        <Button>Play Your Story</Button>
      </Link>
    </div>
  );
}
