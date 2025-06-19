import type { Metadata } from "next";

import CharacterCreator from "@/components/features/create-character/character-creator";

export const metadata: Metadata = {
  title: "Create Character: Make Your Own Story on Textual Games",
  description:
    "Create your own story on Textual Games. Make your own choices and see where your story takes you.",
};

export default function CreateCharacterPage() {
  return (
    <main>
      <CharacterCreator />
    </main>
  );
}
