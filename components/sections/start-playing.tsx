import Link from "next/link";

import { Button } from "../ui/button";

export default function StartPlaying() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 font-mono">
      <h3 className="text-center text-2xl font-bold">
        Are you ready to explore Textual Games?
      </h3>
      <div className="relative flex h-40 w-full max-w-xl items-center justify-center p-12 bg-dot-black/[0.2] dark:bg-dot-white/[0.2] ">
        <Link href="/create-character">
          <Button className="text-xl font-bold">Start Playing Now</Button>
        </Link>
      </div>
    </div>
  );
}
