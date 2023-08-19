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
      "{ story: string; characterName: string; inventory: string[]; choices: string[]; }. Avoid new lines in the story, and anything that can break the json format.";
  }

  async getGptStoryPrompt(data: Story): Promise<StoryPrompt> {
    let numberOfChoices = "two";

    if (data.level === 3 || data.level >= 4) {
      numberOfChoices = "three";
    }

    if (data.story.inventory.length > 0) {
      data.characterStory.items = data.story.inventory;
    }
    const items = data.characterStory.items.join(", ");
    const inventory = `Feel free to incorporate items from your inventory if they are necessary for the story. Currently, your character have: ${items}. 
    
    Also if you want to add or remove some items to my inventory, you can do that too by finding or losing them in the story, or by trading with someone, or similar. Throughout the story, you can find, lose, trade, or acquire new items for your inventory to enhance your character's abilities. Be creative in integrating these items into the narrative.`;
    let levelPlotTwist = "";
    // Something big
    if (data.level === 3) {
      levelPlotTwist =
        "In this level something big should happen, like a big fight or a big decision (depending on the current story circumstances).";
    }

    // Make a friend or ally
    if (data.level === 4) {
      levelPlotTwist =
        "In this level player should make a friend or ally. Ally should have a name, and should be described in the story and whatHappenedSoFar variable.";
    }

    // Plot twist and nemesis
    // if (data.level === 5) {
    //   levelPlotTwist =
    //     "In this level player should find out something new about the story or about himself from an ally or from some book depending on current story circumstances.";
    // }

    // Ally can betray or die
    // if (data.level === 7) {
    //   levelPlotTwist =
    //     "In this level something big should happen with main characters ally, it can be positive or negative.";
    // }

    // Plot twist
    // if (data.level === 8) {
    //   levelPlotTwist =
    //     "Make some big plot twist of the story, it should affect .";
    // }

    // Ending
    if (data.level === 9) {
      levelPlotTwist =
        "This is the last level, make final showdown with the nemesis or a big decision (depending on the current story circumstances).";
    }

    let thePrompt = `Level ${
      data.level
    }: Continue the story based on your choice on level ${data.level - 1}.
    The game should be from first person.
    So far: "${data.story.whatHappenedSoFar}. ${data.story.story}"
    Your previous choice (Level ${data.level - 1}): "${data.choice}"

    ${inventory}

    Add some dialogue to the story. My name is ${
      data.characterName
    }, and I'm a ${data.characterStory.characterType}.
    The initial plot was "${
      data.characterStory.plot
    }", and the game should still follow that direction.

    Genre: ${data.genre}
    Ensure the story remains in the ${
      data.genre
    } genre with ${numberOfChoices} choices available.

    Keep the "whatHappenedSoFar" variable concise, summarizing the events leading up to this point.

    Return the data in the following JSON format: `;

    const gameCharacterStory = `${data.characterStory.characterType} ${data.characterStory.plot}`;

    if (!data.choice || !data.story.story) {
      thePrompt = `Begin the ${data.genre} genre text-based game story with two choices. The game should be from first person.

      The story revolves around my character, ${gameCharacterStory}. My character name is ${data.characterName}. Start by providing a detailed description of my character.
      
      Inventory:
      ${inventory}
      
      Describe the items currently in my inventory.
      
      Set the scene by describing my surroundings, creating an immersive atmosphere for the story.

      Make a little backstory for my character, and put it in the "whatHappenedSoFar" variable. This should be a short summary of the events leading up to the start of the game.
      
      Ensure that the story aligns with the ${data.genre} genre, offering ${numberOfChoices} choices to the player.
      
      Please return the data in the following JSON format:`;
    }

    let basePrompt = `${thePrompt} ${levelPlotTwist} ${this.jsonFormat}`;

    // If level is 10, we are ending the story
    if (data.level === 10) {
      basePrompt = `End my story based on my previous choice with ${data.characterStory.characterType}. ${levelPlotTwist} This is what happened so far: "${data.story.whatHappenedSoFar} ${data.story.story}. My choice was ${data.choice} Genre is ${data.genre}. in json format like this { story: string; }`;
    }

    return { basePrompt, character: gameCharacterStory };
  }

  async getNextLevel(data: Story): Promise<StoryPrompt> {
    let thePrompt = `Continue the story based on my choice.

    My choice was: "${data.choice}"

    Ensure the story remains in the ${data.genre} genre with 2 choices available.

    Return the data in the following JSON format: ${this.jsonFormat}`;

    return { basePrompt: thePrompt, character: data.characterName };
  }
}

export default StoryCreator;
