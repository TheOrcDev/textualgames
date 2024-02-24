import { Story } from "@/components/shared/types";
import {
  characters,
  genres,
  items,
  names,
  plots,
} from "@/components/shared/data";

export const createStory = (random?: boolean): Story => {
  return {
    levelInfo: {
      storyline: "",
      availableChoices: [],
      inventoryItems: [],
      progressSummary: "",
    },
    choice: "",
    image: "",
    characterName: random
      ? names[Math.floor(Math.random() * names.length)]
      : "",
    level: 1,
    characterStory: {
      plot: random ? plots[Math.floor(Math.random() * plots.length)] : "",
      characterType: random
        ? characters[Math.floor(Math.random() * characters.length)]
        : "",
      items: random ? [items[Math.floor(Math.random() * items.length)]] : [],
    },
    genre: random ? genres[Math.floor(Math.random() * genres.length)].name : "",
  };
};
