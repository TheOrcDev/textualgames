import Link from "next/link";

import { GlowContainer } from "@/components/thegridcn/glow-container";
import { StatusBar } from "@/components/thegridcn/status-bar";
import { Button } from "@/components/ui/button";

export default function StartPlaying() {
  return (
    <section className="px-5 py-20 md:px-12 lg:px-24">
      <GlowContainer className="mx-auto max-w-5xl p-0" intensity="lg">
        <StatusBar
          leftContent={<span>Awaiting player input</span>}
          rightContent={<span>System ready</span>}
          variant="info"
        />
        <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              Launch sequence
            </p>
            <h3 className="font-display text-2xl font-bold uppercase tracking-wider md:text-3xl">
              Ready to create your first Grid story?
            </h3>
          </div>
          <Button asChild size="lg" className="font-mono uppercase">
            <Link href="/play/create-character">Start Playing</Link>
          </Button>
        </div>
      </GlowContainer>
    </section>
  );
}
