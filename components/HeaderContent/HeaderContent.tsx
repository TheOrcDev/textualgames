import Image from "next/image";
import Button from "../Button/Button";

interface HeaderContentProps {}

const HeaderContent: React.FC<HeaderContentProps> = ({}) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center w-1/2 md:w-full">
          <Image
            src="/img/logo/textualgameslogolight.png"
            alt="Textual Games"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="flex-col justify-center text-center px-8 md:px-36 text-sm mt-10 w-full">
        <h1 className="text-2xl">Textual Games</h1>
        <p className="mt-10">
          Welcome to the captivating world of interactive storytelling! Prepare
          to embark on thrilling adventures and immerse yourself in a realm
          where your choices shape the course of each unique narrative. Welcome
          to Textual Games!
        </p>
        <div className="flex justify-center my-10">
          <div className="w-4/5 md:w-1/2">
            <a href="#play">
              <Button content="Step into the story" />
            </a>
          </div>
        </div>

        <p className="mt-5">
          Step into a universe brimming with possibilities, where you become the
          protagonist and every decision you make holds the power to alter the
          storyline. With our collection of gripping stories, you will have the
          opportunity to navigate through diverse genres, from epic fantasy
          quests to heart-pounding mysteries, from science fiction odysseys to
          romantic escapades. Whatever your taste, our carefully crafted
          narratives will transport you to a realm where your imagination knows
          no bounds.
        </p>
        {/* <p className="mt-5">
            As you delve into each tale, you will find yourself confronted with
            pivotal moments, where your choices will mold the fate of the
            characters and the world they inhabit. Will you be the hero who
            saves the day, or will your actions lead to unforeseen consequences?
            The power is in your hands, and only you can unravel the intricate
            tapestry of these captivating narratives. Not only will you be
            captivated by the stories we offer, but you will also have the
            opportunity to unleash your own creativity. Dive into our
            interactive story creator, a powerful tool that enables you to forge
            your own adventures from scratch. Craft intricate plots, shape
            unforgettable characters, and develop branching paths that allow
            players to carve their own destinies. With the story creator, you
            become the architect of your own storytelling universe, ready to
            share your creations with the world. Whether you're a seasoned
            storyteller or a curious explorer, [Your Game Website's Name]
            welcomes you to embark on an unforgettable journey of choice and
            consequence. Are you ready to make your mark on the worlds we have
            to offer? Prepare to be enthralled as you enter the gateway to
            countless adventures. The path lies before you. Choose wisely.
            </p> */}
      </div>
    </>
  );
};

export default HeaderContent;
