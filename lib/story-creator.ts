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
   
    Avoid new lines in the story, and anything that can break the json format.
    `;
  }

  // TODO: Add companions
  // TODO: Add enemies
  async getFirstLevelPrompt(game: Game): Promise<StoryPrompt> {
    const inventory = `
      The player may use or interact with items in their inventory if it makes sense in the world.
      Current inventory: ${game.character.items}.
      Items can be gained, lost, traded, or discovered naturally as part of the story.
    `;

    const gameCharacterStory = `${game.character.type} ${game.character.plot}`;

    const thePrompt = `
      You are the dungeon master of an interactive, text-based MUD-style adventure. 
      The player experiences the world through their character's eyes in the ${game.genre} genre.
      
      Character:
      - Name: ${game.character.name}
      - Gender: ${game.character.gender}
      - Role: ${gameCharacterStory}
      
      Start the game by:
      - Giving a vivid first-person description of how my character looks and feels at this moment.  
      - Describing the immediate environment and atmosphere around me in rich detail.  
      - Providing a short backstory about events leading to this starting point.  
      - Ensuring everything matches the tone of a ${game.genre} adventure.  
  
      ${inventory}
  
      Gameplay:
      - Keep the narration immersive, continuous, and written in first-person (as if I am living it).  
      - The world should feel alive: describe locations, NPCs, sounds, smells, and atmosphere.  
      - Present **two distinct choices** for what my character can do next (like a classic text adventure).  
      - Choices should be actions or decisions, not chapter breaks.  
      - The game should feel ongoing, not segmented into levels or chapters.  
    `;

    return { basePrompt: thePrompt, character: gameCharacterStory };
  }

  async getNextStep(game: Game): Promise<StoryPrompt> {
    const thePrompt = `
      Continue the text-based MUD-style adventure seamlessly, reacting to the player's last action.
  
      Player's last choice: "${game.choice}"  
      → This choice should directly shape what happens next.
  
      Inventory: ${game.character.items}  
      - Use items only if they make sense in the story.  
      - New items can be gained, lost, or discovered naturally.  
  
      Genre & Tone: Keep the story firmly within the "${game.genre}" genre, with consistent atmosphere and themes.  
  
      Flow & Immersion:
      - Write in first-person, as the player experiences the world directly.  
      - Keep the narration immersive and continuous, not segmented into levels or chapters.  
      - Maintain coherence with everything that has already happened.  
      - Include sensory details (what I see, hear, smell, feel) and interactions with the environment.  
    `;

    return { basePrompt: thePrompt, character: game.character.name };
  }


  async getImagePrompt(game: Game) {
    return `
    Generate an 8-bit scenery image for a visual novel game, designed to immerse players in the game's atmosphere. The scene must align with the storyline and mood, featuring a consistent, slightly dark aesthetic with muted tones, subtle shadows, and realistic textures to enhance the immersive and grounded feel.

    Storyline: Reflect the narrative of ${game.character.plot}, ensuring the environment complements the plot’s themes and emotional tone.
    
    Character: Depict a ${game.character.gender} ${game.character.type} carrying ${game.character.items}, integrated naturally into the scene. The character’s appearance and posture should harmonize with the setting and mood.
    
    Genre & Mood: "${game.genre}"—craft the atmosphere to evoke the specific emotions and tone of this genre, emphasizing a slightly dark, moody ambiance with realistic lighting and depth.
    
    Style: Photorealistic with a slightly dark aesthetic (e.g., muted color palettes, soft contrasts, and natural textures like weathered surfaces or dim lighting). Ensure the scene feels immersive, atmospheric, and visually striking, capturing fine details like environmental wear, light reflections, or subtle imperfections.
    
    Requirements: Exclude any text, symbols, UI elements, or overlays. Deliver a pure, high-quality scenic artwork that feels like a snapshot from a real, lived-in world, optimized for visual novel storytelling.
  `;
  }
}
