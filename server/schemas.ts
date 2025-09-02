import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    image: z.string().url().optional().or(z.literal("")),
});