import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { Spotlight } from "@/components/ui/spotlight";

import ChangingSentences from "@/components/features/changing-sentences";
import ImageSlider from "@/components/features/image-slider";

import { ModeSwitcher } from "../mode-switcher";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <section className="flex w-full flex-col gap-16 overflow-hidden p-10 pt-20 antialiased sm:h-svh md:items-center md:justify-center md:p-24">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none -z-10",
          "[background-image:linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3">
        <Link href={"/"} className="text-xs sm:text-sm flex items-center gap-2">
          <Image
            width={50}
            height={50}
            src={"/textual-games-logo.png"}
            alt="Textual Games Logo"
            priority
          />
          <h1
            className={cn(pressStart2P.className, "font-bold hidden sm:block")}
          >
            Textual Games
          </h1>
        </Link>
        <ModeSwitcher />
      </div>

      <Spotlight height={1000} />

      <div className="flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-2 text-xl md:text-4xl">
          <h2 className="text-center font-mono font-bold md:text-5xl">
            Create your own{" "}
            <span className="bg-linear-to-r to-primary from-purple-400 via-pink-500 bg-clip-text text-transparent">
              unique story
            </span>
            .
          </h2>

          <ChangingSentences />
        </div>

        <Link href={"/play/create-character"}>
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
        <h3 className="text-muted-foreground text-center font-mono text-xl font-bold">
          Screenshots from the game
        </h3>

        <ImageSlider />
      </div>
    </section>
  );
}
