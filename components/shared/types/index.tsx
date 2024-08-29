export type Game = {
  id: string;
  levels: Level[];
  character: Character;
  choice: string;
  genre: string;
};

export type Level = {
  id: string;
  gameId: string;
  level: string;
  storyline: string;
  choices: string; // JSON object
  image: string;
  createdAt: string;
};

export type Character = {
  id: string;
  name: string;
  plot: string;
  type: string;
  items: string; // JSON object
  gameId: string;
  createdAt: string;
};

export const Tokens = {
  TEN: "10",
  FIFTY: "50",
  HUNDRED: "100",
} as const;
export type Tokens = (typeof Tokens)[keyof typeof Tokens];
