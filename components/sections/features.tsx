import { Key } from "lucide-react";

import FeaturesBentoGrid from "../features/features-bento-grid";
import { Badge } from "../ui/badge";

export default function Features() {
  return (
    <section className="flex w-full flex-col gap-7 overflow-hidden p-10 pt-20 font-mono antialiased md:p-24">
      <Badge className="w-max px-2 py-1">
        <h3 className="flex items-center gap-2 text-xl font-bold">
          <Key className="size-5" /> Features
        </h3>
      </Badge>
      <h2 className="text-2xl font-bold md:text-4xl">
        Key Features of{" "}
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-primary bg-clip-text text-transparent">
          Textual Games
        </span>
      </h2>

      <FeaturesBentoGrid />
    </section>
  );
}
