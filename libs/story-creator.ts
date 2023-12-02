export type Story = {
  story: Level;
  choice: string;
  level: number;
  genre: string;
  characterName: string;
  characterStory: CharacterStory;
};

export type Level = {
  story: string;
  choices: string[];
  inventory: string[];
  whatHappenedSoFar: string;
};

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

export type CharacterStory = {
  plot: string;
  characterType: string;
  items: string[];
};

class StoryCreator {
  private jsonFormat: string;

  constructor() {
    this.jsonFormat =
      "{ story: string; choices: string[]; }. Avoid new lines in the story, and anything that can break the json format.";
  }

  async getGptStoryPrompt(data: Story): Promise<StoryPrompt> {
    if (data.story.inventory.length > 0) {
      data.characterStory.items = data.story.inventory;
    }
    const items = data.characterStory.items.join(", ");
    const inventory = `Feel free to incorporate items from your inventory if they are necessary for the story. Currently, your character have: ${items}. 
    
    Also if you want to add or remove some items to my inventory, you can do that too by finding or losing them in the story, or by trading with someone, or similar. Throughout the story, you can find, lose, trade, or acquire new items for your inventory to enhance your character's abilities. Be creative in integrating these items into the narrative.`;

    const gameCharacterStory = `${data.characterStory.characterType} ${data.characterStory.plot}`;

    const thePrompt = `You are a dungeon master running a text base game with a player.
      
      Begin the ${data.genre} genre text-based game story with two choices. The game should be from first person.

      The story revolves around my character, ${gameCharacterStory}. My character name is ${data.characterName}. Start by providing a detailed description of my character.
      
      Inventory:
      ${inventory}
      
      Describe the items currently in my inventory.
      
      Set the scene by describing my surroundings, creating an immersive atmosphere for the story.

      Make a little backstory for my character. This should be a short summary of the events leading up to the start of the game.
      
      Ensure that the story aligns with the ${data.genre} genre.
      
      Please return the data in the following JSON format, offering two choices to the player, which will be only for showing what could players potentially write as their action:`;

    let basePrompt = `${thePrompt} ${this.jsonFormat}`;

    return { basePrompt, character: gameCharacterStory };
  }

  async getNextLevel(data: Story): Promise<StoryPrompt> {
    const thePrompt = `Continue the story based on my choice.

    My choice was: "${data.choice}"

    Ensure the story remains in the ${data.genre} genre with 2 choices available.

    Return the data in the following JSON format: ${this.jsonFormat}`;

    return { basePrompt: thePrompt, character: data.characterName };
  }
}

export default StoryCreator;
