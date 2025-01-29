import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Spotlight } from "@/components/ui/spotlight";

export default function Homepage() {
  return (
    <div className="relative flex h-svh w-full flex-col overflow-hidden rounded-md bg-black/[0.96] antialiased bg-grid-white/[0.02] md:items-center md:justify-center">
      <Spotlight height={1500} />
      <h1 className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-3xl font-bold text-transparent md:text-4xl xl:text-7xl">
        Textual Games
      </h1>
      <Link href={"/create-character"}>
        <div className="relative">
          <GlowEffect
            colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
            mode="colorShift"
            duration={3}
            scale={0.9}
          />
          <Button className="relative bg-zinc-950">Try For Free</Button>
        </div>
      </Link>
    </div>
  );
}
