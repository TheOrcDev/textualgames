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
    <div className="grid gap-4 md:min-h-[500px] md:grid-cols-4">
      <Card className="group relative col-span-2 flex w-full flex-col bg-zinc-950 p-6 md:col-span-1 md:row-span-3">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <Shuffle className="size-6 text-white" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Unique Story
            </h3>
            <p className="text-zinc-400">
              No two adventures are the same. Your choices shape a dynamic
              narrative that evolves with every playthrough.
            </p>
          </div>
        </div>
      </Card>

      <Card className="group relative col-span-2 overflow-hidden bg-zinc-950 p-6 md:col-span-2 md:row-span-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <Infinity className="size-6 text-white" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Endless Possibilities
            </h3>
            <p className="text-zinc-400">
              Your choices shape the world around you. Explore limitless
              adventures, forge alliances, or create chaos - it's all up to you.
            </p>
          </div>
        </div>
      </Card>

      <Card className="group relative col-span-2 overflow-hidden bg-zinc-950 p-6 md:col-span-1 md:row-span-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <VenetianMask className="size-6 text-white" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold text-white">
              True Roleplaying Freedom
            </h3>
            <p className="text-zinc-400">
              Speak, act, and play however you want. There are no predefined
              paths, only the story you create.
            </p>
          </div>
        </div>
      </Card>

      <Card className="group relative col-span-2 overflow-hidden bg-zinc-950 p-6 md:col-span-3 md:row-span-2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10 flex h-full flex-col justify-between gap-5">
          <Badge className="w-max p-2.5">
            <Globe className="size-6 text-white" />
          </Badge>
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-semibold text-white">
              Persistent Worlds
            </h3>
            <p className="text-zinc-400">
              Your actions leave a lasting impact. Return to a world that
              remembers your choices and evolves with your journey.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
