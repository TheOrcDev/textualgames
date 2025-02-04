import { Game } from "@/db/schema";

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

export default class StoryCreator {
  private jsonFormat: string;

  constructor() {
    this.jsonFormat = `
    Please return the story in the following JSON format 
    { "storyline": string, "choices": string[], "items": string[] }. 
    There should be two potential choices for this level in choices array. 
    Avoid new lines in the story, and anything that can break the json format.
    `;
  }

  // TODO: Add companions
  // TODO: Add enemies

  async getGptStoryPrompt(game: Game): Promise<StoryPrompt> {
    const inventory = `
      Feel free to incorporate items from inventory if they can logically be used for the game.
      Currently, character has: ${game.character.items}.
      If you want to add or remove items from the inventory, you can do that by finding, losing, trading, or acquiring them in the game.
      Be creative in integrating these items into the narrative.
    `;

    const gameCharacterStory = `${game.character.type} ${game.character.plot}`;

    const thePrompt = `
      You are a dungeon master running a text-based game with a player.
      Begin the ${game.genre} genre text-based game.
      The story revolves around my character, ${gameCharacterStory}.
      My character's name is ${game.character.name}, with a ${game.character.gender} gender. Start by providing a detailed description of my character.
      The game should be from first person, as my character sees the world.
      
      Inventory:
      ${inventory}
      
      Set the scene by describing my surroundings, creating an immersive atmosphere for the game.
      Make a little backstory for my character, a short summary of the events leading up to the start of the game.
      Ensure that the story aligns with the ${game.genre} genre.
      
      ${this.jsonFormat}
    `;

    return { basePrompt: thePrompt, character: gameCharacterStory };
  }

  async getNextLevel(game: Game): Promise<StoryPrompt> {
    const thePrompt = `
      Continue the story based on my choice.

      My choice was: "${game.choice}"
      
      Feel free to incorporate items from inventory if they can logically be used for the game.
      Currently, character has: ${game.character.items}.

      Ensure the story remains in the ${game.genre}.
      
      ${this.jsonFormat}
    `;

    return { basePrompt: thePrompt, character: game.character.name };
  }

  async getImagePrompt(game: Game) {
    return `
    Create a highly detailed, photorealistic scenery image for a visual novel game. 
    The setting should align with the game's storyline and mood.

    - Storyline: ${game.character.plot}

    - Character: A ${game.character.gender} ${game.character.type} carrying ${game.character.items}.

    - Genre & Mood: "${game.genre}" (ensure the atmosphere matches this genre).

    - Style: Photorealistic, immersive, and visually striking.

    - Requirements: No text, symbols, UI elements, or overlays—just a pure, high-quality scenic artwork.
  `;
  }
}
