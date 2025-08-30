import { Key } from "lucide-react";

import FeaturesBentoGrid from "../features/features-bento-grid";
import { Badge } from "../ui/badge";

export default function Features() {
  return (
    <section className="retro flex w-full flex-col gap-7 overflow-hidden p-10 pt-20  antialiased md:p-24">
      <Badge className="w-max px-2 py-1">
        <h3 className="flex items-center gap-2 text-xl font-bold">
          <svg
            width="50"
            height="50"
            viewBox="0 0 256 256"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="0.25"
            className="size-10"
            aria-label="key"
          >
            <rect x="120" y="200" width="14" height="14" rx="1"></rect>
            <rect x="104" y="200" width="14" height="14" rx="1"></rect>
            <rect x="136" y="200" width="14" height="14" rx="1"></rect>
            <rect x="136" y="152" width="14" height="14" rx="1"></rect>
            <rect x="104" y="152" width="14" height="14" rx="1"></rect>
            <rect x="120" y="88" width="14" height="14" rx="1"></rect>
            <rect x="120" y="152" width="14" height="14" rx="1"></rect>
            <rect x="120" y="104" width="14" height="14" rx="1"></rect>
            <rect x="152" y="200" width="14" height="14" rx="1"></rect>
            <rect x="104" y="168" width="14" height="14" rx="1"></rect>
            <rect x="136" y="184" width="14" height="14" rx="1"></rect>
            <rect x="136" y="168" width="14" height="14" rx="1"></rect>
            <rect x="120" y="168" width="14" height="14" rx="1"></rect>
            <rect x="88" y="200" width="14" height="14" rx="1"></rect>
            <rect x="104" y="184" width="14" height="14" rx="1"></rect>
            <rect x="88" y="168" width="14" height="14" rx="1"></rect>
            <rect x="88" y="184" width="14" height="14" rx="1"></rect>
            <rect x="152" y="168" width="14" height="14" rx="1"></rect>
            <rect x="152" y="184" width="14" height="14" rx="1"></rect>
            <rect x="120" y="72" width="14" height="14" rx="1"></rect>
            <rect x="120" y="40" width="14" height="14" rx="1"></rect>
            <rect x="136" y="88" width="14" height="14" rx="1"></rect>
            <rect x="136" y="56" width="14" height="14" rx="1"></rect>
            <rect x="120" y="136" width="14" height="14" rx="1"></rect>
            <rect x="120" y="120" width="14" height="14" rx="1"></rect>
            <rect x="120" y="56" width="14" height="14" rx="1"></rect>
          </svg>{" "}
          Features
        </h3>
      </Badge>
      <h2 className="text-2xl font-bold md:text-2xl">
        Key Features of Textual Games
      </h2>

      <FeaturesBentoGrid />
    </section>
  );
}
