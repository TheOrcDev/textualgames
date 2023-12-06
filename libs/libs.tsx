import { characters, plots, items, lessUsefulItems } from "./data";
import { CharacterStory } from "./types";

export function getStory(): CharacterStory {
  const getRandomString = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // TODO: Friends
  // TODO: Enemies

  const randomCharacter = getRandomString(characters);
  const randomStory = getRandomString(plots);
  const randomItem = getRandomString(items);
  const randomLessUsefulItem = getRandomString(lessUsefulItems);

  return {
    plot: randomStory,
    characterType: randomCharacter,
    items: [randomItem, randomLessUsefulItem],
  };
}
