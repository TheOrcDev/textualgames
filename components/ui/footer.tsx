import { AtSign, Code2 } from "lucide-react";
import Link from "next/link";

import { UplinkHeader } from "@/components/thegridcn/uplink-header";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
      <UplinkHeader
        leftText="Textual Games"
        rightText={`Grid year ${year}`}
        className="mb-6"
      />
      <div className="flex flex-col items-center justify-between gap-5 border border-primary/20 bg-card/40 p-5 backdrop-blur sm:flex-row">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.24em] text-primary">
            Textual Games
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Play your unique story.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="icon" variant="outline">
            <Link
              href="https://x.com/theorcdev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Textual Games on X"
            >
              <AtSign className="size-4" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="outline">
            <Link
              href="https://github.com/TheOrcDev/textualgames"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Textual Games on GitHub"
            >
              <Code2 className="size-4" />
            </Link>
          </Button>
        </div>

        <p className="text-center font-mono text-xs uppercase tracking-widest text-muted-foreground sm:text-right">
          Copyright &copy; {year}
        </p>
      </div>
    </footer>
  );
}
