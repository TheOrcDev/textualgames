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

export const Tokens = {
  TEN: "10",
  FIFTY: "50",
  HUNDRED: "100",
} as const;
export type Tokens = (typeof Tokens)[keyof typeof Tokens];
