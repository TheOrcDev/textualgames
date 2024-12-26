"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const sentences = [
  "Loading...",
  "Your story is never the same.",
  "Your story is always unique.",
  "Play your story.",
  "Make your own decisions.",
  "Try out all the categories.",
  "Discover hidden secrets.",
  "Unleash your imagination.",
  "Forge your path.",
  "Unlock new adventures.",
  "Embark on epic quests.",
  "Face challenging obstacles.",
  "Experience thrilling encounters.",
  "Uncover ancient mysteries.",
  "Navigate treacherous landscapes.",
  "Choose your allies wisely.",
  "Conquer fearsome foes.",
  "Explore vast realms.",
  "Shape the fate of your character.",
  "Dive into immersive narratives.",
  "Test your strategic skills.",
  "Unravel complex storylines.",
  "Embrace the power of words.",
  "Escape into a world of fantasy.",
  "Challenge your perception.",
  "Uncover the truth.",
  "Become a legendary hero.",
  "Forge alliances with intriguing characters.",
  "Navigate moral dilemmas.",
  "Make life-changing decisions.",
  "Witness the consequences of your actions.",
  "Experience moments of triumph.",
  "Learn from your failures.",
  "Discover unexpected surprises.",
  "Create your own story.",
  "Immerse yourself in rich lore.",
  "Unleash your creativity.",
  "Delve into deep character development.",
  "Unearth rare treasures.",
  "Master unique skills and abilities.",
  "Solve intricate puzzles.",
  "Navigate through time and space.",
  "Unveil hidden identities.",
  "Challenge the limits of your imagination.",
  "Experience the power of choice.",
  "Embrace the unknown.",
  "Embark on a journey of self-discovery.",
  "Engage in captivating dialogue.",
  "Shape the world around you.",
  "Have a good laugh.",
];

const getRandomSentence = () => {
  return sentences[Math.floor(Math.random() * sentences.length)];
};

export default function LoadingSentences() {
  const [sentence, setSentence] = useState<string>("");

  useEffect(() => {
    setSentence(getRandomSentence());
    const interval = setInterval(() => {
      setSentence(getRandomSentence());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 flex w-full items-center justify-center gap-2">
      <p
        key={sentence}
        className="
        flex items-center 
        justify-center text-center text-sm
        "
      >
        {sentence}
      </p>
      <Loader2 className="size-10 animate-spin" />
    </div>
  );
}
