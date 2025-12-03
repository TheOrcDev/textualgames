import { Game } from "@/db/schema";

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

export default class GameCreator {
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
      ## Inventory System
      The player may use or interact with items in their inventory if it makes sense in the world.
      - Current inventory: ${game.character.items}.
      - Items can be gained, lost, traded, or discovered naturally as part of the story.
    `;

    const gameCharacterStory = `${game.character.type} ${game.character.plot}`;

    const thePrompt = `
      # Role
      You are the Game Master of an immersive, text-based MUD-style adventure. 
      The player experiences the world through their character's eyes in the ${game.genre} genre.
      
      # Character Profile
      - Name: ${game.character.name}
      - Gender: ${game.character.gender}
      - Role: ${gameCharacterStory}
      
      # Objective
      Start the game by:
      1. Giving a vivid first-person description of how the character looks and feels at this moment.  
      2. Describing the immediate environment and atmosphere in rich detail.  
      3. Providing a short backstory about events leading to this starting point.  
      4. Ensuring everything matches the tone of a ${game.genre} adventure.  
  
      ${inventory}
  
      # Gameplay Rules
      - **Perspective**: Write in first-person (as if the player is living it).
      - **Immersion**: The world should feel alive. Describe locations, NPCs, sounds, smells, and atmosphere.
      - **Choices**: Present **two distinct choices** for what the character can do next. Choices should be actions or decisions, not chapter breaks.
      - **Flow**: The game is ongoing, not segmented into levels or chapters.
    `;

    return { basePrompt: thePrompt, character: gameCharacterStory };
  }

  async getNextStep(game: Game): Promise<StoryPrompt> {
    const thePrompt = `
      # Instruction
      Continue the text-based MUD-style adventure seamlessly, reacting to the player's last action.
  
      # Context
      - **Player's Action**: "${game.choice}" (This choice must directly shape the narrative).
      - **Inventory**: ${game.character.items} (Use items only if relevant. Items can be gained/lost).
      - **Genre**: ${game.genre} (Maintain consistent atmosphere and themes).
  
      # Writing Guidelines
      - **Perspective**: First-person ("I see...", "I feel...").
      - **Immersion**: Continuous narration. No level breaks.
      - **Consistency**: Maintain coherence with previous events.
      - **Sensory Details**: Include sights, sounds, smells, and tactile sensations.
    `;

    return { basePrompt: thePrompt, character: game.character.name };
  }


  async getImagePrompt(game: Game) {
    return `
    # Image Generation Prompt
    Generate an 8-bit scenery image for a visual novel game.
    
    ## Aesthetic & Style
    - **Style**: Photorealistic 8-bit pixel art.
    - **Mood**: Slightly dark, muted tones, subtle shadows, realistic textures.
    - **Atmosphere**: Immersive, grounded, "lived-in" world.
    
    ## Content
    - **Setting**: Align with the narrative: ${game.character.plot}.
    - **Character**: A ${game.character.gender} ${game.character.type} carrying ${game.character.items}.
    - **Genre**: ${game.genre}.
    
    ## Constraints
    - NO text, symbols, UI elements, or overlays.
    - Pure scenic artwork.
  `;
  }
}
