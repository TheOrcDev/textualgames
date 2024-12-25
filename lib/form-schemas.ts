import { z } from "zod";

import { Genre } from "@/components/shared/types";

export const createCharacterFormSchema = z.object({
  genre: z.nativeEnum(Genre),
  name: z.string().min(2).max(64),
  gender: z.enum(["male", "female"]),
  plot: z.string(),
  type: z.string(),
  items: z.string(),
  // Uncomment and update if skill field is needed
  // skill: z.string()
  //   .min(2, { message: "Skill must be at least 2 characters long." })
  //   .max(64, { message: "Skill cannot exceed 64 characters." }),
});
