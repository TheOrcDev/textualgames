import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { DataCard } from "@/components/thegridcn/data-card";
import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Button } from "@/components/ui/button";

import ChangingSentences from "@/components/features/changing-sentences";
import ImageSlider from "@/components/features/image-slider";

import { ModeSwitcher } from "../mode-switcher";

export default function Hero() {
  return (
    <CircuitBackground className="min-h-screen w-full" opacity={0.12}>
      <GridScanOverlay className="opacity-80" />
      <section className="relative flex min-h-screen w-full flex-col gap-12 overflow-hidden px-5 pb-14 pt-24 sm:min-h-svh md:px-10 lg:px-16">
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between border-b border-primary/25 bg-background/80 px-5 py-3 backdrop-blur">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogo size="lg" />
          </Link>
          <ModeSwitcher />
        </div>

        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="space-y-8">
            <UplinkHeader
              leftText="Story generator online"
              rightText="Grid channel 01"
            />

            <div className="space-y-5">
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-primary">
                Target acquired
              </p>
              <h1 className="max-w-4xl font-display text-4xl font-black uppercase leading-none tracking-wider text-foreground sm:text-6xl lg:text-7xl">
                Play your own unique story
              </h1>
              <div className="min-h-12 max-w-2xl text-lg text-muted-foreground">
                <ChangingSentences />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-mono uppercase">
                <Link href="/play/create-character">Enter the Grid</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-mono uppercase"
              >
                <Link href="/play/my-games">Resume stories</Link>
              </Button>
            </div>

            <StatusBar
              leftContent={<span>AI narrative engine: active</span>}
              rightContent={<span>Choices generate new branches</span>}
              variant="info"
            />
          </div>

          <DataCard
            title="Player Session"
            subtitle="Mission brief"
            status="active"
            fields={[
              { label: "Mode", value: "Interactive fiction", highlight: true },
              { label: "Worlds", value: "Fantasy / Sci-Fi / Dystopian" },
              { label: "Loop", value: "Choose / adapt / survive" },
            ]}
            className="hidden lg:block"
          />
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.28em] text-muted-foreground">
              Game snapshots
            </h2>
            <span className="hidden font-mono text-xs uppercase text-primary sm:inline">
              Visual feed
            </span>
          </div>
          <ImageSlider />
        </div>
      </section>
    </CircuitBackground>
  );
}
