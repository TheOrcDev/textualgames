export type Story = {
  level: GameLevel;
  character: Character;
  choice: string;
  genre: string;
  image: string;
};

export type GameLevel = {
  level: number;
  storyline: string;
  availableChoices: string[];
  inventoryItems: string[];
  progressSummary: string;
};

export type Character = {
  name: string;
  plot: string;
  type: string;
  items: string[];
};
