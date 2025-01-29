"use client";

import { useEffect, useState } from "react";

import { sentences } from "../shared/data";
import { TextEffect } from "../ui/text-effect";

export default function ChangingSentences() {
  const [sentence, setSentence] = useState<string>("");

  useEffect(() => {
    setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    const interval = setInterval(() => {
      setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TextEffect
      per="word"
      as="h2"
      preset="blur"
      className="text-center font-mono font-bold"
    >
      {sentence}
    </TextEffect>
  );
}
