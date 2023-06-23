type Story = {
  story: string;
  choice: string;
  level: number;
  character: string;
  genre: string;
  storyLevel: string;
  characterName: string;
};

type StoryPrompt = {
  basePrompt: string;
  character: string;
};

class StoryCreator {
  // private baseURL: string | undefined;
  private jsonFormat: string;

  constructor() {
    this.jsonFormat =
      "{ story: string; choices: string[]; characterName: string; }";
  }

  private async getStory(): Promise<string> {
    const stories = [
      "me as a a knight with a greatsword trying to make peace with the dragon after years of war",
      "me as a banana sold cheap at market, and I am trying to survive in new home with my new friend apple, where other fruits and vegetables are trying to kill us",
      "me as a cowboy with two pistols fighting the aliens",
      "me as a teardrop in the ocean, trying to be a king",
      "me as a dragon with shiny red scales trying to find love",
      "me as a barbarian skilled with an axe which is trying to find a way to start sewing",
      "me as a zombie trying to find a way to be a human again",
      "me as a vampire trying to find a way to be a human again",
    ];

    const randomStory = stories[Math.floor(Math.random() * stories.length)];

    return randomStory;
  }

  async getGptStoryPrompt(data: Story): Promise<StoryPrompt> {
    let numberOfChoices = "two";

    if (data.level === 3 || data.level >= 5) {
      numberOfChoices = "three";
    }
    console.log("character name", data.characterName);
    let firstPartOfPrompt = `Continue my story with ${data.character}. My name is ${data.characterName}. My current level is ${data.story}. My choice was ${data.choice}. Give me next level based on my choice, with ${numberOfChoices} new choices. Genre is ${data.genre}.`;
    const oneBadOutcome =
      "One choice outcome should be a bad one, and will harm the character.";

    const twoBadOutcomes =
      "Two choice outcomes should be a bad ones, and will harm the character.";

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

    // If there is no story, we need to get it from the database
    const gameStory = data.story ? data.story : await this.getStory();
    if (!data.choice || !data.story) {
      firstPartOfPrompt = `Give me the first level of textual game story in ${data.genre} genre with two choices about ${gameStory}. First describe my character and give the apropiate name to it.`;
    }

    const settingsForPrompt = `in json format like this ${this.jsonFormat}, choices should sound like coming from first person game don't put any option 1, or 1) or a) or similar. Story string inside the object shouldn't have any choices in it. Make sure that the story is ${data.genre} genre, with choices in that manner also.`;

    let basePrompt = `${firstPartOfPrompt} ${settingsForPrompt}}`;

    // If level is 10, we are ending the story
    if (data.level === 10) {
      basePrompt = `End my story with ${data.character}. My current level is ${data.story}. My choice was ${data.choice}. Genre is ${data.genre}. in json format like this { story: string; }`;
    }
    console.log("basePrompt", basePrompt);
    console.log(gameStory);
    return { basePrompt, character: gameStory };
  }
}

export default StoryCreator;
