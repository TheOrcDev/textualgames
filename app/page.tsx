import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { GlowEffect } from "@/components/ui/glow-effect";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Spotlight } from "@/components/ui/spotlight";

const images = [
  "/img/screenshots/demon-leading-an-army.webp",
  "/img/screenshots/orc-leading-an-army.webp",
  "/img/screenshots/zombie-trying-to-escape-from-magical-realm.webp",
  "/img/screenshots/resistance-leader-dystopian.webp",
  "/img/screenshots/alien-post-apocalyptic.webp",
  "/img/screenshots/space-explorer-in-space.webp",
];

export default function Homepage() {
  return (
    <div className="flex w-full flex-col gap-16 overflow-hidden rounded-md bg-black/[0.96] p-24 antialiased bg-grid-white/[0.02] md:items-center md:justify-center">
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

      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-center font-mono text-4xl font-bold">
          Create Your Own Unique Story
        </h2>
        <h2 className="text-center font-mono text-4xl font-bold">
          Shape the fate of your character.
        </h2>
      </div>

      <div className="flex max-w-3xl flex-col items-center justify-center gap-5">
        <h3 className="text-center font-mono text-xl font-bold text-muted-foreground">
          some of our players
        </h3>
        <InfiniteSlider duration={75} gap={24}>
          {images.map((image) => (
            <Image
              src={image}
              key={image}
              alt="Dean blunt - Black Metal 2"
              className="rounded-md"
              width={500}
              height={500}
            />
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
}
