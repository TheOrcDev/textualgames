export type Story = {
  level: Level;
  character: Character;
  choice: string;
  genre: string;
  image: string;
};

export type Level = {
  level: number;
  storyline: string;
  choices: string[];
  items: string[];
};

export type Character = {
  name: string;
  plot: string;
  type: string;
  items: string[];
};
