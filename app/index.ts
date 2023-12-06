import { characters, genres, items, names, plots } from "@/libs/data";
import { Story } from "@/libs/types";

export type PartyMember = {
  name: string;
  race: string;
  class: string;
  gold: number;
};

export const createStory = (random?: boolean): Story => {
  return {
    levelInfo: {
      storyline: "",
      availableChoices: [],
      inventoryItems: [],
      progressSummary: "",
    },
    choice: "",
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
