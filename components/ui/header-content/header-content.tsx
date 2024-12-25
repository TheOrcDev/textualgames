import { Button } from "@/components/ui/button";

type Props = {
  getRandomGame: () => void;
};

export default function HeaderContent({ getRandomGame }: Props) {
  return (
    <div className="w-full flex-col justify-center px-8 text-center text-sm md:px-36">
      <h1 className="text-2xl">Textual Games</h1>
      <p className="mt-10">
        Welcome to the captivating world of interactive storytelling! Prepare to
        embark on thrilling adventures and immerse yourself in a realm where
        your choices shape the course of each unique narrative. Welcome to
        Textual Games!
      </p>
      <div className="my-10 flex justify-center">
        <div className="flex gap-5 whitespace-nowrap">
          <a href="#play">
            <Button>Choose your story</Button>
          </a>
          <Button onClick={getRandomGame}>Quick game</Button>
        </div>
      </div>

      <p className="mt-5">
        Step into a universe brimming with possibilities, where you become the
        protagonist and every decision you make holds the power to alter the
        storyline. With our collection of gripping stories, you will have the
        opportunity to navigate through diverse genres, from epic fantasy quests
        to heart-pounding mysteries, from science fiction odysseys to romantic
        escapades. Whatever your taste, our carefully crafted narratives will
        transport you to a realm where your imagination knows no bounds.
      </p>
    </div>
  );
}
