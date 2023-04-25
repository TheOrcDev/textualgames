import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type Choice = {
  text: string;
  story: Story;
};

type Story = {
  story: string;
  choices: Choice[];
};

export default function Home() {
  const [story, setStory] = useState<Story>({
    story: "",
    choices: [],
  });

  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const chatGptData = await fetch("/api/gpt", {
      method: "POST",
    });
    const result = await chatGptData.json();
    const storyData = await JSON.parse(result.data.message.content);
    setStory(storyData);
    setLoading(false);
    console.log(storyData);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-12 ${inter.className}`}
    >
      <div className="flex flex-col items-center">
        {!story.story && (
          <>
            <h1 className="font-mono">Textual Games</h1>
            <div className="mt-20 flex justify-center">
              <ButtonBadge content="Cowboy Adventure" onClick={getData} />
              <ButtonBadge
                content="The Knight"
                color="#A2B59F"
                onClick={getData}
              />
              <ButtonBadge
                content="Superheroes"
                color="#E2D2D2"
                onClick={getData}
              />
            </div>
          </>
        )}

        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        )}

        <div>
          {story.story && (
            <div className="px-20">
              <p className="text-2xl mt-10 mb-5">{story.story}</p>
              {story.choices &&
                story.choices.map((choice: Choice) => (
                  <div className="flex justify-center" key={choice.text}>
                    <ButtonBadge
                      content={choice.text}
                      onClick={() => setStory(choice.story)}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
