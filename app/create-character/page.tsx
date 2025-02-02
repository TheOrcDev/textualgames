import type { Metadata } from "next";

import CharacterCreator from "@/components/features/create-character/character-creator";

export const metadata: Metadata = {
  title: "My Games: Explore Your Creations on Textual Games",
  description:
    "View, edit, and continue your AI-generated stories. Explore all your past creations and keep the adventure going with Textual Games.",
};

export default function CreateCharacterPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-5 p-5 py-10 pt-20 md:p-24">
      <CharacterCreator />
    </main>
  );
}
