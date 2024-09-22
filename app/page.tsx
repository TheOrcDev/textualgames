import Link from "next/link";

import { Screenshots } from "@/components/features";
import { Badge, Button } from "@/components/ui";

export default function PlayPage() {
  return (
    <>
      <div className="relative flex h-svh w-full flex-col items-center justify-center gap-1 bg-background bg-grid-black/[0.2] dark:bg-grid-white/[0.2]">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-center text-4xl font-bold text-transparent sm:text-7xl">
          Textual Games
        </p>
        <p className="animate-pulse text-primary">
          Register now to get 5 free tokens
        </p>
        <Badge>beta</Badge>
        <Link href={"/create-character"}>
          <Button>Play Your Story</Button>
        </Link>
      </div>
      <Screenshots />
    </>
  );
}
