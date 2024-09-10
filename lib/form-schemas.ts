import { z } from "zod";

import { Genre } from "@/components/shared/types";

export const createCharacterFormSchema = z.object({
  genre: z.nativeEnum(Genre),
  name: z.string().min(2).max(64),
  gender: z.enum(["male", "female"]),
  // TODO: Set these to be type checked by array values
  plot: z.string().min(2).max(64),
  type: z.string().min(2).max(64),
  items: z.string().min(2).max(64),
  //   skill: z.string().min(2).max(64),
});
