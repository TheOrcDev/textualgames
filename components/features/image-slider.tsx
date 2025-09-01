import Image from "next/image";

import { InfiniteSlider } from "../ui/infinite-slider";

const images = [
  {
    src: "/img/screenshots/8bit-orc-leading-an-army.png",
    alt: "Orc leading an army",
  },
  {
    src: "/img/screenshots/8bit-zombie-trying-to-escape-from-magical-realm.png",
    alt: "Zombie trying to escape from magical realm",
  },
  {
    src: "/img/screenshots/8bit-demon-leading-an-army.png",
    alt: "Demon leading an army",
  },
  {
    src: "/img/screenshots/8bit-resistance-leader-dystopian.png",
    alt: "Resistance leader dystopian",
  },
  {
    src: "/img/screenshots/wizard-in-the-underworld.webp",
    alt: "Wizard in the underworld",
  },
  {
    src: "/img/screenshots/alien-post-apocalyptic.webp",
    alt: "Alien post apocalyptic",
  },
  {
    src: "/img/screenshots/space-explorer-in-space.webp",
    alt: "Space explorer in space",
  },
  {
    src: "/img/screenshots/orc-with-potion-of-strength.webp",
    alt: "Orc with potion of strength",
  },
  {
    src: "/img/screenshots/djin-finding-lost-soul.webp",
    alt: "Djin finding lost soul",
  },
];

export default function ImageSlider() {
  return (
    <InfiniteSlider duration={75} gap={24}>
      {images.map((image) => (
        <Image
          src={image.src}
          key={image.src}
          alt={image.alt}
          className="aspect-video w-96 rounded-md md:w-full border-2"
          width={500}
          height={500}
        />
      ))}
    </InfiniteSlider>
  );
}
