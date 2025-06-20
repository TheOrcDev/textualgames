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
      Continue the story naturally based on my choice while maintaining coherence with previous events.

      - Player's Choice: "${game.choice}" (This should directly influence the next events).

      - Inventory: The character currently has ${game.character.items}. Use these items only if there is a logical and meaningful way to do so.

      - Genre & Tone: The story must stay within the "${game.genre}" genre, preserving its themes and atmosphere.

      - Flow & Immersion: The continuation should feel organic, engaging, and in line with prior developments.
            
      ${this.jsonFormat}
    `;

    return { basePrompt: thePrompt, character: game.character.name };
  }

  async getImagePrompt(game: Game) {
    return `
    Generate a highly detailed, photorealistic scenery image for a visual novel game, designed to immerse players in the game's atmosphere. The scene must align with the storyline and mood, featuring a consistent, slightly dark aesthetic with muted tones, subtle shadows, and realistic textures to enhance the immersive and grounded feel.

    Storyline: Reflect the narrative of ${game.character.plot}, ensuring the environment complements the plot’s themes and emotional tone.
    
    Character: Depict a ${game.character.gender} ${game.character.type} carrying ${game.character.items}, integrated naturally into the scene. The character’s appearance and posture should harmonize with the setting and mood.
    
    Genre & Mood: "${game.genre}"—craft the atmosphere to evoke the specific emotions and tone of this genre, emphasizing a slightly dark, moody ambiance with realistic lighting and depth.
    
    Style: Photorealistic with a slightly dark aesthetic (e.g., muted color palettes, soft contrasts, and natural textures like weathered surfaces or dim lighting). Ensure the scene feels immersive, atmospheric, and visually striking, capturing fine details like environmental wear, light reflections, or subtle imperfections.
    
    Requirements: Exclude any text, symbols, UI elements, or overlays. Deliver a pure, high-quality scenic artwork that feels like a snapshot from a real, lived-in world, optimized for visual novel storytelling.
  `;
  }
}
