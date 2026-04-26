import {
  Bot,
  GitBranch,
  ImageIcon,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import { FeatureCard } from "@/components/thegridcn/feature-card";
import { StatCard } from "@/components/thegridcn/stat-card";

const features = [
  {
    title: "Unique Story",
    description:
      "No two adventures are the same. Every choice feeds a new branch in the narrative engine.",
    icon: GitBranch,
    variant: "highlight" as const,
  },
  {
    title: "AI Narration",
    description:
      "The next scene is generated from your character, inventory, genre, and previous choices.",
    icon: Bot,
  },
  {
    title: "Visual Scenes",
    description:
      "Each run gets mood-matched scene art that keeps the adventure grounded and inspectable.",
    icon: ImageIcon,
  },
  {
    title: "Persistent Runs",
    description:
      "Resume stories, review past creations, and keep your favorite branches within reach.",
    icon: RotateCcw,
  },
  {
    title: "Character Loadouts",
    description:
      "Start with a role, identity, and item that meaningfully shape the opening chapter.",
    icon: ShieldCheck,
  },
  {
    title: "Story Chat",
    description:
      "Talk through the adventure with a focused interface designed for fast choices.",
    icon: MessageSquareText,
  },
];

export default function FeaturesBentoGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <StatCard
          title="Narrative branches"
          value="∞"
          unit="paths"
          trend="up"
          trendValue="player driven"
          className="h-full min-h-44"
        />
      </div>
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={<Icon className="size-5" />}
            variant={feature.variant}
            className="min-h-44"
          />
        );
      })}
    </div>
  );
}
