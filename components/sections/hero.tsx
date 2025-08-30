import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/8bit/button";

import ChangingSentences from "@/components/features/changing-sentences";
import ImageSlider from "@/components/features/image-slider";

import { ModeSwitcher } from "../mode-switcher";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <div className="min-h-screen w-full relative">
      {/* Circuit Board Background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "#f8fafc",
          backgroundImage: `
        linear-gradient(90deg, #e2e8f0 1px, transparent 1px),
        linear-gradient(180deg, #e2e8f0 1px, transparent 1px),
        linear-gradient(90deg, #cbd5e1 1px, transparent 1px),
        linear-gradient(180deg, #cbd5e1 1px, transparent 1px)
      `,
          backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background: "#171717",
          backgroundImage: `
            linear-gradient(90deg, #171717 1px, transparent 1px),
            linear-gradient(180deg, #171717 1px, transparent 1px),
            linear-gradient(90deg, #262626 1px, transparent 1px),
            linear-gradient(180deg, #262626 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px, 50px 50px, 10px 10px, 10px 10px",
        }}
      />

      <section className="flex w-full flex-col gap-16 overflow-hidden p-10 pt-20 antialiased sm:h-svh md:items-center md:justify-center md:p-24 z-10">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-3">
          <Link
            href={"/"}
            className="text-xs sm:text-sm flex items-center gap-2"
          >
            <Image
              width={50}
              height={50}
              src={"/textual-games-logo.png"}
              alt="Textual Games Logo"
              priority
            />
            <h1
              className={cn(
                pressStart2P.className,
                "font-bold hidden sm:block"
              )}
            >
              Textual Games
            </h1>
          </Link>
          <ModeSwitcher />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center gap-2 text-xl md:text-4xl">
            <h2 className="text-center  font-bold md:text-2xl retro">
              Create your own unique story.
            </h2>

            <ChangingSentences />
          </div>

          <Button asChild>
            <Link href={"/play/create-character"}>Try Now For Free</Link>
          </Button>
        </div>

        <div className="flex max-w-3xl flex-col items-center justify-center gap-5">
          <h3 className="retro text-muted-foreground text-center  text-xl font-bold">
            Screenshots from the game
          </h3>

          <ImageSlider />
        </div>
      </section>
    </div>
  );
}
