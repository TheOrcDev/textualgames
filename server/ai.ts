"use server";

import db from "@/db/drizzle";
import { characters, Game, games, levels } from "@/db/schema";
import { createCharacterFormSchema } from "@/lib/form-schemas";
import StoryCreator from "@/lib/story-creator";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createChat } from "@/lib/chat-store";
import { generateId, generateObject, zodSchema } from "ai";
import { isSubscriptionValid } from "./subscriptions";
import { getUserSession } from "./users";

const creator = new StoryCreator();

export async function createCharacter(
  formData: z.infer<typeof createCharacterFormSchema>
) {
  const { user } = await getUserSession();

  try {
    const subscription = await isSubscriptionValid();

    if (!subscription) {
      throw new Error('Usage limit exceeded');
    }
  } catch (e) {
    throw e;
  }

  try {

    const [newGame] = await db
      .insert(games)
      .values({
        email: user.email,
        genre: formData.genre,
        choice: "",
      })
      .returning({ id: games.id });

    await db.insert(characters).values({
      ...formData,
      gameId: newGame.id,
    });

    const game = await db.query.games.findFirst({
      where: eq(games.id, newGame.id),
      with: {
        character: true,
        levels: true,
      },
    });

    if (!game || !game.character) {
      throw new Error("Game or character not found");
    }

    await createFirstLevel(game as Game);

    return { gameId: game.id };
  } catch (e) {
    throw e;
  }
}

export async function createFirstLevel(game: Game) {
  const validCharacter = game.character ?? {
    id: "",
    name: "",
    gender: "male",
    plot: "",
    type: "",
    items: "",
    gameId: "",
    createdAt: new Date(),
  };


  // TODO: Add this as a paid feature
  // const imagePrompt = await creator.getImagePrompt(game);

  // const { images } = await generateImage({
  //   model: openai.image('dall-e-3'),
  //   prompt: imagePrompt,
  //   n: 3,
  //   size: '1792x1024',
  // });

  // // Convert base64 to Buffer for proper blob creation
  // const base64Data = images[0].base64;
  // const buffer = Buffer.from(base64Data, 'base64');

  // const blob = await put(`${game.id}-${Date.now()}.png`, buffer, {
  //   access: 'public',
  // });

  const level = (
    await creator.getFirstLevelPrompt({ ...game, character: validCharacter })
  ).basePrompt;

  const gameResponseSchema = z.object({
    storyline: z.string(),
    choices: z.array(z.object({ text: z.string() })),
    items: z.array(z.string()),
  });

  const { object } = await generateObject({
    model: process.env.AI_MODEL!,
    schema: zodSchema(gameResponseSchema),
    prompt: level,
  });

  await db.insert(levels).values({
    storyline: object.storyline,
    choices: object.choices,
    image: "",
    level: String(1),
    gameId: game.id,
  });

  await createChat(game.id, [{
    id: generateId(),
    role: "assistant",
    parts: [{
      type: "text",
      text: object.storyline,
    }],
  }]);

  return { gameId: game.id, level: object };
}
