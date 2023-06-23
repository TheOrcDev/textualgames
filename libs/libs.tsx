import { CharacterStory } from "./story-creator";

export function getStory(): CharacterStory {
  const characters = [
    "a knight",
    "a banana",
    "a cowboy",
    "a teardrop",
    "a dragon",
    "a barbarian",
    "a zombie",
    "a vampire",
  ];

  const plots = [
    "trying to make peace with dragons after years of war",
    "with two pistols fighting the aliens",
    "in the ocean, trying to be a king",
    "trying to find love",
    "trying to find a way to start sewing",
    "trying to find a way to be a human again",
  ];

  const randomCharacter =
    characters[Math.floor(Math.random() * characters.length)];

  const randomStory = plots[Math.floor(Math.random() * plots.length)];

  return {
    plot: randomStory,
    characterType: randomCharacter,
  };
}
