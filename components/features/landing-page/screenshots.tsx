import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const screenshots = [
  {
    src: "/img/screenshots/orc-leading-an-army.webp",
    alt: "Orc leading an army",
    caption: "Orc leading an army",
  },
  {
    src: "/img/screenshots/zombie-trying-to-escape-from-magical-realm.webp",
    alt: "Zombie trying to escape from magical realm",
    caption: "Zombie trying to escape from magical realm",
  },
  {
    src: "/img/screenshots/demon-leading-an-army.webp",
    alt: "Demon leading an army",
    caption: "Demon leading an army",
  },
];

export default function Screenshots() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center gap-10">
      <h2 className="font-bold md:text-2xl">Characters you can play</h2>
      <Carousel className="w-2/3">
        <CarouselContent>
          {screenshots.map((screenshot) => (
            <CarouselItem key={screenshot.src}>
              <div className="flex flex-col items-center justify-center gap-3">
                <Image
                  width={450}
                  height={450}
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full"
                />
                <p>{screenshot.caption}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
