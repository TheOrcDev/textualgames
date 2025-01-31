import Link from "next/link";

import ChangingSentences from "@/components/features/changing-sentences";
import ImageSlider from "@/components/features/image-slider";
import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Spotlight } from "@/components/ui/spotlight";

export default function Hero() {
  return (
    <section className="flex h-svh w-full flex-col gap-16 overflow-hidden p-10 pt-20 antialiased bg-grid-black/[0.03] dark:bg-grid-white/[0.03] md:items-center md:justify-center md:p-24">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3">
        <Link href={"/"} className="text-xs sm:text-sm">
          <h1 className="font-bold">Textual Games</h1>
        </Link>
        <ModeToggle />
      </div>

      <Spotlight height={1000} />

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-2 text-xl md:text-4xl">
          <h2 className="text-center font-mono font-bold md:text-5xl">
            Create your own{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-primary bg-clip-text text-transparent">
              unique story
            </span>
            .
          </h2>

          <ChangingSentences />
        </div>

        <Link href={"/create-character"}>
          <div className="relative w-max">
            <GlowEffect
              colors={["#FF5733", "#33FF57", "#3357FF", "#F1C40F"]}
              mode="colorShift"
              duration={3}
              scale={0.9}
            />
            <Button className="relative bg-zinc-950 font-mono text-xl font-semibold">
              Play For Free
            </Button>
          </div>
        </Link>
      </div>

      <div className="flex max-w-3xl flex-col items-center justify-center gap-5">
        <h3 className="text-center font-mono text-xl font-bold text-muted-foreground">
          Screenshots from the game
        </h3>

        <ImageSlider />
      </div>
    </section>
  );
}
