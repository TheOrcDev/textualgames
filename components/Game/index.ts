import { characters, genres, items, names, plots } from "@/libs/data";
import { Story } from "@/libs/story-creator";

export const createDefaultStoryState = (): Story => ({
  story: {
    story: "",
    choices: [],
    inventory: [],
    whatHappenedSoFar: "",
  },
  choice: "",
  characterName: "",
  level: 1,
  characterStory: {
    plot: "",
    characterType: "",
    items: [],
  },
  genre: "",
});

export const createRandomStory = (): Story => {
  const randomCharacterName = names[Math.floor(Math.random() * names.length)];
  const randomPlot = plots[Math.floor(Math.random() * plots.length)];
  const randomCharacterType =
    characters[Math.floor(Math.random() * characters.length)];
  const randomItem = items[Math.floor(Math.random() * items.length)];
  const randomGenre = genres[Math.floor(Math.random() * genres.length)];

  return {
    story: {
      story: "",
      choices: [],
      inventory: [],
      whatHappenedSoFar: "",
    },
    choice: "",
    characterName: randomCharacterName,
    level: 1,
    characterStory: {
      plot: randomPlot,
      characterType: randomCharacterType,
      items: [randomItem],
    },
    genre: randomGenre.name,
  };
};
