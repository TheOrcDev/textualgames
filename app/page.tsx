import Link from "next/link";

import ChangingSentences from "@/components/features/changing-sentences";
import ImageSlider from "@/components/features/image-slider";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Spotlight } from "@/components/ui/spotlight";

export default function Homepage() {
  return (
    <main className="flex w-full flex-col gap-16 overflow-hidden bg-black/[0.96] p-10 antialiased bg-grid-white/[0.02] md:items-center md:justify-center md:p-24">
      <Spotlight height={1000} />

      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-3xl font-bold text-transparent md:text-4xl xl:text-6xl">
          Textual Games
        </h1>

        <Link href={"/create-character"}>
          <div className="relative w-max">
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
              mode="colorShift"
              duration={3}
              scale={0.9}
            />
            <Button className="relative bg-zinc-950 font-mono text-xl font-semibold">
              Try For Free
            </Button>
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 text-xl text-neutral-200 md:text-4xl">
        <h2 className="text-center font-mono font-bold">
          Create your own unique story
        </h2>

        <ChangingSentences />
      </div>

      <div className="flex max-w-3xl flex-col items-center justify-center gap-5">
        <h3 className="text-center font-mono text-xl font-bold text-muted-foreground">
          Screenshots from the game
        </h3>

        <ImageSlider />
      </div>
    </main>
  );
}
