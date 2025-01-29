import Image from "next/image";

import { InfiniteSlider } from "../ui/infinite-slider";

const images = [
  "/img/screenshots/demon-leading-an-army.webp",
  "/img/screenshots/orc-leading-an-army.webp",
  "/img/screenshots/zombie-trying-to-escape-from-magical-realm.webp",
  "/img/screenshots/resistance-leader-dystopian.webp",
  "/img/screenshots/alien-post-apocalyptic.webp",
  "/img/screenshots/space-explorer-in-space.webp",
];

export default function ImageSlider() {
  return (
    <InfiniteSlider duration={75} gap={24}>
      {images.map((image) => (
        <Image
          src={image}
          key={image}
          alt="Dean blunt - Black Metal 2"
          className="aspect-video w-96 rounded-md md:w-full"
          width={500}
          height={500}
        />
      ))}
    </InfiniteSlider>
  );
}
