import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";

export const metadata: Metadata = {
  title: "404 | Textual Games",
  description:
    "The page you are looking for does not exist. Please check the URL and try again.",
};

export default function NotFound() {
  return (
    <div className="grid h-screen w-full place-content-center gap-5 bg-background px-4 text-center">
      <Image
        src={"/img/404/pixel.webp"}
        width={300}
        height={300}
        alt="Textual Games 404"
        className="bg-white"
      />

      <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Uh-oh!</h1>

      <p className="text-gray-500">You are lost.</p>
      <div className="flex justify-center">
        <div className="relative w-max">
          <GlowEffect
            colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
            mode="colorShift"
            duration={3}
            scale={0.9}
          />
          <Button
            className="relative inline-flex items-center gap-1 rounded-md bg-zinc-950 px-2.5 py-1.5 text-sm text-zinc-50 outline outline-[#fff2f21f]"
            asChild
          >
            <Link href={"/"}>Return to Home Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
