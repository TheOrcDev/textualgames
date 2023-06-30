import ButtonBadge from "@/components/ButtonBadge/ButtonBadge";
import { Level } from "@/libs/story-creator";
import { useRouter } from "next/router";

export interface StoryLevelProps {
  getNextLevel: (choice: string, storyLevel: string) => void;
  level: Level;
}

export const StoryLevel: React.FC<StoryLevelProps> = ({
  getNextLevel,
  level,
}) => {
  const router = useRouter();

  return (
    <div
      className="
    flex-row justify-center text-center px-5 sm:px-40 
    pb-20 scroll-smooth overflow-auto h-full no-scrollbar"
    >
      <p className="text-sm md:text-xl mt-10 mb-5">{level.story}</p>
      {level.choices ? (
        level.choices.map((choice: string, index: number) => (
          <div className="flex justify-center" key={index}>
            <ButtonBadge
              content={choice}
              onClick={() => getNextLevel(choice, level.story)}
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <ButtonBadge
            content="Play New Story"
            onClick={() => router.reload()}
          />
        </div>
      )}
    </div>
  );
};

export default StoryLevel;
