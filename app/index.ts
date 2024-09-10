import { Game, Genre } from "@/components/shared/types";

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
      gender: "male",
      type: "",
      items: "",
      createdAt: "",
    },
    genre: Genre.FANTASY,
  };
};
