import { Game } from "@/components/shared/types";

export const createStory = (): Game => {
  return {
    id: "",
    levels: [],
    choice: "",

    character: {
      id: "",
      gameId: "",
      name: "",
      plot: "",
      type: "",
      items: "",
      createdAt: "",
    },
    genre: "",
  };
};
