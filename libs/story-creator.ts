export type Story = {
  story: Level;
  choice: string;
  level: number;
  character: string;
  genre: string;
  characterName: string;
  characterStory: CharacterStory;
};

type Level = {
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
      "{ story: string;  whatHappenedSoFar: string; characterName: string; inventory: string[]; choices: string[]; }";
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
    const inventory = `My character can use items from his inventory if necessary. I currently have: ${items}. Also if you want to add or remove some items to my inventory, you can do that too by finding or losing them in the story, or by trading with someone, or similar.`;

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
    if (data.level === 7) {
      levelPlotTwist =
        "In this level something big should happen with main characters ally, it can be positive or negative.";
    }

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

    let thePrompt = `Give me the level ${
      data.level
    }, continue the story based on my choice on level ${
      data.level - 1
    }. ${levelPlotTwist} This is what happened so far: "${
      data.story.whatHappenedSoFar
    }. ${data.story.story}" My choice on level ${data.level - 1} was: "${
      data.choice
    }", continue the story from that decision. ${inventory} Add little bit of dialog too. My name is ${
      data.characterName
    } and I'm ${
      data.characterStory.characterType
    }, and the plot in the beginning of the game was "${data.characterName} ${
      data.characterStory.plot
    }", and game should still be aimed in that direction. Genre is ${
      data.genre
    }. Make sure that the story is in ${
      data.genre
    } genre, with ${numberOfChoices} choices in that manner also. whatHappenedSoFar variable should contain a much shorter version of everything that happened until now. Return data in this JSON format: `;

    const gameCharacterStory = `${data.characterStory.characterType} ${data.characterStory.plot}`;

    if (!data.choice || !data.story.story) {
      thePrompt = `Give me the first level of textual game story in ${data.genre} genre with two choices about me as ${gameCharacterStory}. First describe my character and give the appropriate name, and lastname to it. ${inventory} Describe the items in my inventory. Make sure that the story is ${data.genre} genre, with ${numberOfChoices} choices in that manner also. Return data in this JSON format: ${this.jsonFormat}`;
    }
    let basePrompt = `${thePrompt} ${this.jsonFormat}`;

    // If level is 10, we are ending the story
    if (data.level === 10) {
      basePrompt = `End my story based on my previous choice with ${data.character}. ${levelPlotTwist} This is what happened so far: "${data.story.whatHappenedSoFar} ${data.story.story}. My choice was ${data.choice} Genre is ${data.genre}. in json format like this { story: string; }`;
    }

    return { basePrompt, character: gameCharacterStory };
  }
}

export default StoryCreator;
