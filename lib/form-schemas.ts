import { z } from "zod";

import { Genre } from "@/components/shared/types";

export const createCharacterFormSchema = z.object({
  genre: z.nativeEnum(Genre),
  name: z
    .string()
    .min(2, {
      message: "You have to write a name.",
    })
    .max(64, {
      message: "Name cannot exceed 64 characters.",
    }),
  gender: z.enum(["male", "female"]).default("male"),
  plot: z
    .string({
      message: "You have to choose a story.",
    })
    .min(2, {
      message: "You have to choose a story.",
    })
    .max(64, {
      message: "Story cannot exceed 64 characters.",
    }),
  type: z
    .string({
      message: "You have to choose a type.",
    })
    .min(2, {
      message: "You have to choose a type.",
    })
    .max(64, {
      message: "Type cannot exceed 64 characters.",
    }),
  items: z
    .string()
    .min(2, {
      message: "You have to choose an item.",
    })
    .max(64, {
      message: "Item cannot exceed 64 characters.",
    }),
  // Uncomment and update if skill field is needed
  // skill: z.string()
  //   .min(2, { message: "Skill must be at least 2 characters long." })
  //   .max(64, { message: "Skill cannot exceed 64 characters." }),
});
