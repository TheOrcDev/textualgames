type Story = {
  story: string;
  choice: string;
  level: number;
  character: string;
  genre: string;
  storyLevel: string;
  characterName: string;
  characterStory: CharacterStory;
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

  constructor(private characterStory: CharacterStory) {
    this.jsonFormat =
      "{ story: string; choices: string[]; characterName: string; }";
    this.characterStory = characterStory;
  }

  async getGptStoryPrompt(data: Story): Promise<StoryPrompt> {
    let numberOfChoices = "two";

    if (data.level === 3 || data.level >= 5) {
      numberOfChoices = "three";
    }
    let firstPartOfPrompt = `This was my previous level: ${data.story}. My choice was: ${data.choice}. Continue the story, but don't repeat too much of previous level. Add little bit of dialog too. My name is ${data.characterName} and I'm ${this.characterStory.characterType}, and the plot in the beginning of the game was ${data.characterName} ${this.characterStory.plot}, game should still be aimed in that direction.`;
    const oneBadOutcome =
      "One choice outcome should be bad, and will harm the character.";

    const twoBadOutcomes =
      "Two choice outcomes should be bad, and will harm the character.";

    if (data.level === 3) {
      const somethingBig = `In this level something big should happen, like a big fight or a big decision (depending on the current story circumstances). ${oneBadOutcome}`;
      firstPartOfPrompt = `${firstPartOfPrompt} ${somethingBig}`;
    }

    if (data.level === 5) {
      firstPartOfPrompt = `${firstPartOfPrompt} ${oneBadOutcome} and make some kind of nemesis for my character.`;
    }

    if (data.level >= 7) {
      firstPartOfPrompt = `${firstPartOfPrompt} ${twoBadOutcomes}`;
    }

    const gameCharacterStory = `${this.characterStory.characterType} ${this.characterStory.plot}`;
    if (!data.choice || !data.story) {
      firstPartOfPrompt = `Give me the first level of textual game story in ${data.genre} genre with two choices about ${gameCharacterStory}. First describe my character and give the apropiate name to it.`;
    }

    const settingsForPrompt = `I should have ${numberOfChoices} number of choices. Choices should sound like coming from first person game don't put any option 1, or 1) or a) or similar. Make sure that the story is ${data.genre} genre, with choices in that manner also. Send the data in this JSON format: ${this.jsonFormat} without anything else inside the object. Story string inside the JSON object shouldn't contain any list with options, choices etc That part should be in choices parameter.`;

    let basePrompt = `${firstPartOfPrompt} ${settingsForPrompt}`;

    // If level is 10, we are ending the story
    if (data.level === 10) {
      basePrompt = `End my story with ${data.character}. My current level is ${data.story}. My choice was ${data.choice}. Genre is ${data.genre}. in json format like this { story: string; }`;
    }

    console.log("gameCharacterStory", gameCharacterStory);
    // console.log("basePrompt", basePrompt);

    return { basePrompt, character: gameCharacterStory };
  }
}

export default StoryCreator;
