import Link from "next/link";

import { Button } from "@/components/ui/8bit/button";

export default function StartPlaying() {
  return (
    <div className="retro flex flex-col items-center justify-center gap-4 bg-primary py-10">
      <h3 className="text-center text-xl font-bold md:text-2xl">
        Are you ready to explore Textual Games?
      </h3>
      <div className="relative flex h-40 w-full max-w-xl items-center justify-center p-12 bg-dot-black/[0.2] dark:bg-dot-white/[0.2] ">
        <Button variant="secondary" asChild>
          <Link href="/play/create-character">Start Playing Now</Link>
        </Button>
      </div>
    </div>
  );
}
