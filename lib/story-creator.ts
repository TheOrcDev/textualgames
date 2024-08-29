import { Game } from "../components/shared/types";

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

export default class StoryCreator {
  private jsonFormat: string;

  constructor() {
    this.jsonFormat = `Please return the story in the following JSON format 
      { storyline: string; choices: string[]; }. 
      There should be two potential choices for this level in choices array. 
      Avoid new lines in the story, and anything that can break the json format.`;
  }

  // TODO: Add companions
  // TODO: Add enemies

  async getGptStoryPrompt(game: Game): Promise<StoryPrompt> {
    this.updateCharacterInventory(game);

    const inventory = `
      Feel free to incorporate items from your inventory if they are necessary for the game.
      Currently, your character has: ${game.character.items}.
      If you want to add or remove items from the inventory, you can do that by finding, losing, trading, or acquiring them in the game.
      Be creative in integrating these items into the narrative.
    `;

    const gameCharacterStory = `${game.character.type} ${game.character.plot}`;

    const thePrompt = `
      You are a dungeon master running a text-based game with a player.
      Begin the ${game.genre} genre text-based game game. The game should be from first person.
      The story revolves around my character, ${gameCharacterStory}.
      My character's name is ${game.character.name}. Start by providing a detailed description of my character.
      
      Inventory:
      ${inventory}
      
      Describe the items currently in my inventory.
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
      
      Ensure the story remains in the ${game.genre}.
      
      ${this.jsonFormat}
    `;

    return { basePrompt: thePrompt, character: game.character.name };
  }

  private updateCharacterInventory(game: Game) {
    const items = JSON.parse(game.character.items);

    if (items.length > 0) {
      game.character.items = game.character.items;
    }
  }
}
