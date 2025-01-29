"use client";

import { useEffect, useState } from "react";

import { sentences } from "@/components/shared/data";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";

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
    <div className="absolute top-1/2 flex w-full flex-col items-center justify-center gap-2">
      <TextShimmerWave
        duration={1}
        spread={1}
        zDistance={1}
        scaleDistance={1.1}
        rotateYDistance={20}
        key={sentence}
        className="flex items-center justify-center text-center text-sm"
      >
        {sentence}
      </TextShimmerWave>
    </div>
  );
}
