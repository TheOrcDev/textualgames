import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Spotlight } from "@/components/ui/spotlight";

export default function Homepage() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center gap-1 bg-background p-24 bg-grid-black/[0.2] dark:bg-grid-white/[0.05]">
      <Spotlight />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-4xl font-bold text-transparent sm:text-7xl">
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
