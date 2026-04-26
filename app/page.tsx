import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  ChevronRight,
  Compass,
  Gamepad2,
  Layers3,
  MessagesSquare,
  Radio,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import {
  dystopianCharacters,
  dystopianItems,
  dystopianPlots,
  fantasyCharacters,
  fantasyItems,
  fantasyPlots,
  sciFiCharacters,
  sciFiItems,
  sciFiPlots,
} from "@/components/shared/data";
import { ModeSwitcher } from "@/components/mode-switcher";
import { CircuitBackground } from "@/components/thegridcn/circuit-background";
import { DataCard } from "@/components/thegridcn/data-card";
import { FeatureCard } from "@/components/thegridcn/feature-card";
import { GlowContainer } from "@/components/thegridcn/glow-container";
import { GridScanOverlay } from "@/components/thegridcn/grid-scan-overlay";
import { StatCard } from "@/components/thegridcn/stat-card";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { Terminal } from "@/components/thegridcn/terminal";
import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";

const navLinks = [
  { label: "Systems", href: "#systems" },
  { label: "Stories", href: "#stories" },
  { label: "FAQ", href: "#faq" },
];

const storyImages = [
  {
    src: "/img/screenshots/space-explorer-in-space.webp",
    alt: "Space explorer story scene",
    label: "Deep Orbit",
  },
  {
    src: "/img/screenshots/resistance-leader-dystopian.webp",
    alt: "Resistance leader story scene",
    label: "Dystopian Cell",
  },
  {
    src: "/img/screenshots/orc-leading-an-army.webp",
    alt: "Orc leading an army story scene",
    label: "War March",
  },
];

const features = [
  {
    title: "Living Story Engine",
    description:
      "Each choice updates the world, rewrites the stakes, and keeps the next scene pointed at your character.",
    icon: <BrainCircuit className="size-4" />,
    variant: "highlight" as const,
  },
  {
    title: "Fast Mission Setup",
    description:
      "Pick a role, setting, goal, and tone without wrestling a blank prompt box.",
    icon: <Compass className="size-4" />,
  },
  {
    title: "Playable Branches",
    description:
      "Suggestions, direct actions, and custom commands all stay in the same playable loop.",
    icon: <Gamepad2 className="size-4" />,
  },
  {
    title: "Persistent Runs",
    description:
      "Resume old stories, clean up completed games, and keep your active adventures in one command center.",
    icon: <Layers3 className="size-4" />,
  },
  {
    title: "Clear Game State",
    description:
      "Status panels surface character, location, momentum, and looming danger while you play.",
    icon: <Radio className="size-4" />,
  },
  {
    title: "Account Sync",
    description:
      "Your profile, limits, theme, and story history travel with your login.",
    icon: <ShieldCheck className="size-4" />,
  },
];

const faqs = [
  {
    question: "What kind of games can I make?",
    answer:
      "Fantasy quests, sci-fi missions, dystopian escapes, paranormal mysteries, survival stories, and odd little hybrids that only make sense once you start playing.",
  },
  {
    question: "Do I need to write a perfect prompt?",
    answer:
      "No. The setup flow gives the story engine enough signal to launch, then you steer through choices or freeform commands.",
  },
  {
    question: "Can I continue an old story?",
    answer:
      "Yes. Your game library keeps saved runs available so you can return to a character and keep pushing the plot forward.",
  },
];

const playerReports = [
  {
    player: "Mara",
    genre: "Fantasy",
    character:
      fantasyCharacters.find((character) => character === "orc") ??
      fantasyCharacters[0],
    objective:
      fantasyPlots.find((plot) => plot === "leading army against invading force") ??
      fantasyPlots[0],
    item:
      fantasyItems.find((item) => item === "potion of strength") ??
      fantasyItems[0],
    note: "The army started breaking before sunrise, so I used the potion of strength to hold the bridge and force the invaders into a narrow fight.",
    status: "Front line held",
  },
  {
    player: "Keon",
    genre: "Sci-Fi",
    character:
      sciFiCharacters.find((character) => character === "deep-space explorer") ??
      sciFiCharacters[0],
    objective:
      sciFiPlots.find((plot) => plot.includes("lost spaceship")) ??
      sciFiPlots[0],
    item:
      sciFiItems.find((item) => item === "holographic communicator") ??
      sciFiItems[0],
    note: "The ship answered with my own distress call from six hours ahead. I paused there because every option looked dangerous.",
    status: "Signal unstable",
  },
  {
    player: "Nina",
    genre: "Dystopian",
    character:
      dystopianCharacters.find(
        (character) => character === "resistance leader",
      ) ?? dystopianCharacters[0],
    objective:
      dystopianPlots.find((plot) => plot.includes("surveillance network")) ??
      dystopianPlots[0],
    item:
      dystopianItems.find((item) => item === "clandestine transmitter") ??
      dystopianItems[0],
    note: "The cleanest path was not the loud one. I used the transmitter to turn a checkpoint guard into an informant.",
    status: "Checkpoint cleared",
  },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-primary/70">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-2xl font-black uppercase leading-tight tracking-wider text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      )}
      <div className="mx-auto mt-5 flex justify-center gap-1">
        <span className="h-px w-14 bg-primary/70" />
        <span className="h-px w-7 bg-primary/35" />
        <span className="h-px w-3 bg-primary/20" />
      </div>
    </div>
  );
}

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-primary/20 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <BrandLogo size="md" />
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ModeSwitcher />
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/play/create-character">
                Start <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      <CircuitBackground className="relative overflow-hidden" opacity={0.12}>
        <GridScanOverlay className="opacity-80" gridSize={84} scanSpeed={9} />
        <section className="mx-auto grid min-h-[calc(100svh-65px)] max-w-7xl items-center gap-12 px-5 pb-12 pt-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_480px] lg:px-8 lg:py-16">
          <div className="space-y-8">
            <UplinkHeader
              leftText="Narrative grid online"
              rightText="Player channel ready"
            />

            <div className="space-y-5">
              <Badge className="border-primary/40 bg-primary/10 font-mono text-[10px] uppercase tracking-[0.24em] text-primary hover:bg-primary/15">
                AI stories you can actually play
              </Badge>
              <h1 className="max-w-4xl font-display text-4xl font-black uppercase leading-none tracking-wider text-foreground sm:text-6xl lg:text-7xl">
                Textual Games
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Create a character, choose a world, and step into an adaptive
                text adventure where every decision becomes the next scene.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/play/create-character">
                  Create Story <Zap className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/play/my-games">
                  Resume Games <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>

            <StatusBar
              variant="info"
              leftContent={<span>Story engine: armed</span>}
              rightContent={<span>Freeform commands accepted</span>}
            />
          </div>

          <div className="space-y-4">
            <GlowContainer className="overflow-hidden p-0" intensity="lg">
              <StatusBar
                leftContent={<span>Live brief</span>}
                rightContent={<span>Run seed TG-01</span>}
              />
              <div className="grid gap-4 p-4 sm:grid-cols-2">
                <div className="space-y-4">
                  <DataCard
                    title="Mission Setup"
                    subtitle="Current loadout"
                    fields={[
                      {
                        label: "Role",
                        value: "Exiled pilot",
                        highlight: true,
                      },
                      { label: "World", value: "Neon frontier" },
                      { label: "Goal", value: "Find the lost signal" },
                    ]}
                  />
                  <Terminal
                    title="Story Preview"
                    typewriter={false}
                    lines={[
                      { type: "system", text: "world state synchronized" },
                      { type: "input", text: "scan the crashed relay" },
                      {
                        type: "output",
                        text: "A voice answers from beneath the static.",
                      },
                    ]}
                  />
                </div>
                <div className="relative min-h-80 overflow-hidden rounded border border-primary/30 bg-card/60">
                  <Image
                    src="/img/screenshots/alien-post-apocalyptic.webp"
                    alt="Post-apocalyptic alien story scene"
                    fill
                    sizes="(min-width: 1024px) 240px, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                      Visual feed
                    </p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-wider">
                      Worlds shift with your choices
                    </p>
                  </div>
                </div>
              </div>
            </GlowContainer>
          </div>
        </section>
      </CircuitBackground>

      <section id="stories" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Story signals"
            title="Pick a world, then break it open"
            description="Textual Games is built for quick launches and surprising long runs. Start direct, then let the narrative branch as you push."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {storyImages.map((story) => (
              <div
                key={story.src}
                className="group relative aspect-[4/3] overflow-hidden rounded border border-primary/25 bg-card"
              >
                <Image
                  src={story.src}
                  alt={story.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                    {story.label}
                  </span>
                  <BookOpenText className="size-4 text-primary" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="systems" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Core systems"
            title="Everything a story run needs"
            description="The new Grid interface keeps creation, status, and play choices readable without losing the feeling of entering a console."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          <StatCard
            title="Setup Time"
            value="< 60"
            unit="sec"
            trend="up"
            trendValue="fast launch"
            sparkline={[3, 5, 4, 7, 8, 11, 14]}
          />
          <StatCard
            title="Input Modes"
            value={3}
            unit="ways"
            trend="neutral"
            trendValue="choose / suggest / type"
            sparkline={[4, 4, 5, 5, 6, 6, 7]}
          />
          <StatCard
            title="Grid Themes"
            value={6}
            unit="ids"
            trend="up"
            trendValue="profile ready"
            sparkline={[2, 3, 3, 4, 5, 6, 6]}
          />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Player reports"
            title="A cleaner command center for stranger adventures"
            description="Recent sample runs pulled from the same character, plot, and item pools used by the story creator."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {playerReports.map((report, index) => (
              <div
                key={`${report.player}-${report.character}`}
                className="relative overflow-hidden rounded border border-primary/20 bg-card/70 p-5 backdrop-blur"
              >
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                        Player log 0{index + 1}
                      </p>
                      <h3 className="mt-2 font-display text-base font-black uppercase tracking-wider">
                        {report.character}
                      </h3>
                    </div>
                    <span className="rounded border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-primary">
                      {report.genre}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 border-y border-border/40 py-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                        Objective
                      </p>
                      <p className="mt-1 text-sm leading-6 text-foreground/80">
                        {report.objective}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                          Loadout
                        </p>
                        <p className="mt-1 text-sm capitalize text-foreground/80">
                          {report.item}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                          Status
                        </p>
                        <p className="mt-1 text-sm text-foreground/80">
                          {report.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-foreground/75">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      {report.player}:
                    </span>{" "}
                    {report.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Useful signal before launch" />
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded border border-primary/20 bg-card/70 p-5 backdrop-blur open:border-primary/50"
              >
                <summary className="cursor-pointer list-none font-display text-sm font-bold uppercase tracking-wider text-foreground">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <MessagesSquare className="size-4 shrink-0 text-primary transition-transform group-open:rotate-6" />
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <GlowContainer className="mx-auto max-w-5xl overflow-hidden p-0" intensity="lg">
          <StatusBar
            variant="info"
            leftContent={<span>Launch sequence</span>}
            rightContent={<span>Awaiting player input</span>}
          />
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                Ready
              </p>
              <h2 className="mt-3 font-display text-2xl font-black uppercase tracking-wider md:text-4xl">
                Open a new story channel
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Your next character can be online in under a minute.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/play/create-character">Start Playing</Link>
            </Button>
          </div>
        </GlowContainer>
      </section>

      <Footer />
    </main>
  );
}
