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
};

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

export type CharacterStory = {
  plot: string;
  characterType: string;
};

class StoryCreator {
  private jsonFormat: string;

  constructor() {
    this.jsonFormat =
      "{ story: string; choices: string[]; characterName: string; }";
  }

  async getGptStoryPrompt(data: Story): Promise<StoryPrompt> {
    let numberOfChoices = "two";

    if (data.level === 3 || data.level >= 4) {
      numberOfChoices = "three";
    }
    let firstPartOfPrompt = `This was my previous level: ${data.story.story}. My choice was: ${data.choice}. Continue the story, but don't repeat too much of previous level. Add little bit of dialog too. My name is ${data.characterName} and I'm ${data.characterStory.characterType}, and the plot in the beginning of the game was ${data.characterName} ${data.characterStory.plot}, game should still be aimed in that direction.`;
    const oneBadOutcome = "One of these choices should have a bad outcome.";
    const twoBadOutcomes = "Two of these choices should have a bad outcome.";

    // Something big
    if (data.level === 3) {
      const somethingBig = `In this level something big should happen, like a big fight or a big decision (depending on the current story circumstances). ${oneBadOutcome}`;
      firstPartOfPrompt = `${firstPartOfPrompt} ${somethingBig}`;
    }

    // Make a friend or ally
    if (data.level === 4) {
      const makeFriend = `In this level player should make a friend or ally.`;
      firstPartOfPrompt = `${firstPartOfPrompt} ${makeFriend}`;
    }

    // Plot twist and nemesis
    if (data.level === 5) {
      const plotTwist = `In this level player should find out something new about the story or about himself, like a plot twist.`;
      firstPartOfPrompt = `${firstPartOfPrompt} ${plotTwist} and make some kind of nemesis for my character which will come in next levels.`;
    }

    // Ally can betray or die
    if (data.level === 6) {
      const allyBetray = `In this level player should find out that his ally is a traitor or that he died.`;
      firstPartOfPrompt = `${firstPartOfPrompt} ${allyBetray}`;
    }

    // Prepare ending
    if (data.level === 7) {
      firstPartOfPrompt = `${firstPartOfPrompt} Prepare ending of the story. ${twoBadOutcomes}`;
    }

    // Plot twist
    if (data.level === 8) {
      firstPartOfPrompt = `${firstPartOfPrompt} Make some big plot twist of the story. ${oneBadOutcome}`;
    }

    // Ending
    if (data.level === 9) {
      firstPartOfPrompt = `${firstPartOfPrompt} This is the last level, make final showdown with the nemesis or a big decision (depending on the current story circumstances). ${twoBadOutcomes}`;
    }

    const gameCharacterStory = `${data.characterStory.characterType} ${data.characterStory.plot}`;
    if (!data.choice || !data.story.story) {
      firstPartOfPrompt = `Give me the first level of textual game story in ${data.genre} genre with two choices about ${gameCharacterStory}. First describe my character and give the apropiate name to it.`;
    }

    const settingsForPrompt = `I should have ${numberOfChoices} choices. Choices should sound like coming from first person game don't put any option 1, or 1) or a) or similar. Make sure that the story is ${data.genre} genre, with choices in that manner also. Send the data in this JSON format: ${this.jsonFormat} without anything else inside the object. Story string inside the JSON object shouldn't contain any list with options, choices etc That part should be in choices parameter.`;

    let basePrompt = `${firstPartOfPrompt} ${settingsForPrompt}`;

    // If level is 10, we are ending the story
    if (data.level === 10) {
      basePrompt = `End my story based on my previous choice with ${data.character}. My current level is ${data.story.story}. My choice was ${data.choice}. Genre is ${data.genre}. in json format like this { story: string; }`;
    }

    return { basePrompt, character: gameCharacterStory };
  }
}

export default StoryCreator;
