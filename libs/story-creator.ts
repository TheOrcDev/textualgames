import { Story } from "../components/shared/types";

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

export default class StoryCreator {
  private jsonFormat: string;

  constructor() {
    this.jsonFormat = `Please return the story in the following JSON format 
      { storyline: string; availableChoices: string[]; }. 
      There should be two potential choices for this level in choices array. 
      Avoid new lines in the story, and anything that can break the json format.`;
  }

  // TODO: Add companions
  // TODO: Add enemies

  async getGptStoryPrompt(story: Story): Promise<StoryPrompt> {
    this.updateCharacterInventory(story);

    const items = story.characterStory.items.join(", ");
    const inventory = `
      Feel free to incorporate items from your inventory if they are necessary for the story.
      Currently, your character has: ${items}.
      If you want to add or remove items from the inventory, you can do that by finding, losing, trading, or acquiring them in the story.
      Be creative in integrating these items into the narrative.
    `;

    const gameCharacterStory = `${story.characterStory.characterType} ${story.characterStory.plot}`;

    const thePrompt = `
      You are a dungeon master running a text-based game with a player.
      Begin the ${story.genre} genre text-based game story with two choices. The game should be from first person.
      The story revolves around my character, ${gameCharacterStory}.
      My character's name is ${story.characterName}. Start by providing a detailed description of my character.
      
      Inventory:
      ${inventory}
      
      Describe the items currently in my inventory.
      Set the scene by describing my surroundings, creating an immersive atmosphere for the story.
      Make a little backstory for my character, a short summary of the events leading up to the start of the game.
      Ensure that the story aligns with the ${story.genre} genre.
      
      ${this.jsonFormat}
    `;

    return { basePrompt: thePrompt, character: gameCharacterStory };
  }

  async getNextLevel(story: Story): Promise<StoryPrompt> {
    const thePrompt = `
      Continue the story based on my choice.

      My choice was: "${story.choice}"
      
      Ensure the story remains in the ${story.genre}.
      
      ${this.jsonFormat}
    `;

    return { basePrompt: thePrompt, character: story.characterName };
  }

  private updateCharacterInventory(story: Story) {
    if (story.levelInfo.inventoryItems.length > 0) {
      story.characterStory.items = story.levelInfo.inventoryItems;
    }
  }
}
