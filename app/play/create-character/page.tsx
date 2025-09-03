import type { Metadata } from "next";
import Link from "next/link";

import { isSubscriptionValid } from "@/server/subscriptions";

import { Button } from "@/components/ui/8bit/button";

import CharacterCreator from "@/components/features/create-character/character-creator";

export const metadata: Metadata = {
  title: "Create Character: Make Your Own Story on Textual Games",
  description:
    "Create your own story on Textual Games. Make your own choices and see where your story takes you.",
};

export default async function CreateCharacterPage() {
  const subscription = await isSubscriptionValid();

  if (!subscription) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 max-w-md mx-auto">
        <h2 className="md:text-xl text-center">
          You&apos;ve reached your games limit. Upgrade to create more.
        </h2>
        <Link href={"/play/pricing"}>
          <Button>Upgrade</Button>
        </Link>
      </div>
    );
  }

  return (
    <main>
      <CharacterCreator />
    </main>
  );
}
