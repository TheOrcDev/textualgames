export type Story = {
  levelInfo: GameLevel;
  choice: string;
  level: number;
  genre: string;
  characterName: string;
  characterStory: CharacterStory;
  image: string;
};

export type GameLevel = {
  storyline: string;
  availableChoices: string[];
  inventoryItems: string[];
  progressSummary: string;
};

export type CharacterStory = {
  plot: string;
  characterType: string;
  items: string[];
};
