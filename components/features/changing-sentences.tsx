import { sentences } from "../shared/data";
import TextType from "../text-type";

export default function ChangingSentences() {
  return (
    <TextType
      text={sentences}
      typingSpeed={100}
      pauseDuration={1500}
      showCursor={false}
      cursorCharacter="|"
      textColors={["text-foreground"]}
      className="retro text-xs md:text-xl h-10 text-center"
    />
  );
}
