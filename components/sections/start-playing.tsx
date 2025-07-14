import Link from "next/link";

import { Button } from "../ui/button";

export default function StartPlaying() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-mono">
      <h3 className="text-center text-xl font-bold md:text-2xl">
        Are you ready to explore Textual Games?
      </h3>
      <div className="relative flex h-40 w-full max-w-xl items-center justify-center p-12 bg-dot-black/[0.2] dark:bg-dot-white/[0.2] ">
        <Button className="text-xl font-bold" asChild>
          <Link href="/play/create-character">Start Playing Now</Link>
        </Button>
      </div>
    </div>
  );
}
