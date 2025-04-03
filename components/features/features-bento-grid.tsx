import {
  Globe,
  Heart,
  Infinity,
  Shuffle,
  Target,
  Users,
  VenetianMask,
  Zap,
} from "lucide-react";

import { Card } from "@/components/ui/card";

import { Badge } from "../ui/badge";

export default function BentoGrid() {
  return (
    <div className="grid gap-4 lg:min-h-[500px] lg:grid-cols-4">
      <Card className="group relative col-span-2 flex w-full flex-col bg-zinc-50 p-6 dark:bg-zinc-950 lg:col-span-1 lg:row-span-3">
        <div className="absolute inset-0 rounded-md bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <Shuffle className="size-6" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-2xl font-semibold">Unique Story</h3>
            <p className="text-muted-foreground">
              No two adventures are the same. Your choices shape a dynamic
              narrative that evolves with every playthrough.
            </p>
          </div>
        </div>
      </Card>

      <Card className="group relative col-span-2 overflow-hidden bg-zinc-50 p-6 dark:bg-zinc-950 lg:col-span-2 lg:row-span-1">
        <div className="absolute inset-0 rounded-md bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <Infinity className="size-6" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold">
              Endless Possibilities
            </h3>
            <p className="text-muted-foreground">
              Your choices shape the world around you. Explore limitless
              adventures, forge alliances, or create chaos - it's all up to you.
            </p>
          </div>
        </div>
      </Card>

      <Card className="group relative col-span-2 overflow-hidden bg-zinc-50 p-6 dark:bg-zinc-950 lg:col-span-1 lg:row-span-1">
        <div className="absolute inset-0 rounded-md bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <VenetianMask className="size-6" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold">
              True Roleplaying Freedom
            </h3>
            <p className="text-muted-foreground">
              Speak, act, and play however you want. There are no predefined
              paths, only the story you create.
            </p>
          </div>
        </div>
      </Card>

      <Card className="group relative col-span-2 overflow-hidden bg-zinc-50 p-6 dark:bg-zinc-950 lg:col-span-3 lg:row-span-2">
        <div className="absolute inset-0 rounded-md bg-linear-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <Globe className="size-6" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold">Persistent Worlds</h3>
            <p className="text-muted-foreground">
              Your actions leave a lasting impact. Return to a world that
              remembers your choices and evolves with your journey.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
