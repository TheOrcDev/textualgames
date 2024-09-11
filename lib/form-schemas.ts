import { z } from "zod";

import { Genre } from "@/components/shared/types";

export const createCharacterFormSchema = z.object({
  genre: z.nativeEnum(Genre, {
    errorMap: () => ({ message: "Please select a valid genre." }),
  }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(64, { message: "Name cannot exceed 64 characters." }),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select a valid gender." }),
  }),
  plot: z.string().refine((value) => value.trim().length > 0, {
    message: "You have to choose your story.",
  }),
  type: z.string().refine((value) => value.trim().length > 0, {
    message: "You have to choose your character.",
  }),
  items: z.string().refine((value) => value.trim().length > 0, {
    message: "You have to choose your item.",
  }),
  // Uncomment and update if skill field is needed
  // skill: z.string()
  //   .min(2, { message: "Skill must be at least 2 characters long." })
  //   .max(64, { message: "Skill cannot exceed 64 characters." }),
});
