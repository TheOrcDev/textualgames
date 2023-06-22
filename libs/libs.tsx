export async function getStory() {
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
