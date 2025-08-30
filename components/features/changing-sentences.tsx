"use client";

import { useTheme } from "next-themes";

import { sentences } from "../shared/data";
import TextType from "../text-type";

export default function ChangingSentences() {
  const theme = useTheme();
  const isDark = theme.resolvedTheme === "dark";

  return (
    <TextType
      text={sentences}
      typingSpeed={100}
      pauseDuration={1500}
      showCursor={false}
      cursorCharacter="|"
      textColors={isDark ? ["#ffffff"] : ["#000000"]}
      className="retro text-xl h-10"
    />
  );
}
