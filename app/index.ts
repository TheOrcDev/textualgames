import { Story } from "@/components/shared/types";

export const createStory = (): Story => {
  return {
    level: {
      level: 1,
      storyline: "",
      choices: [],
      items: [],
      progress: "",
    },
    choice: "",
    image: "",
    character: {
      name: "",
      plot: "",
      type: "",
      items: [],
    },
    genre: "",
  };
};
