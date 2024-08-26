import Image from "next/image";

import { genres } from "@/components/shared/data";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";

type Genre = {
  name: string;
  description: string;
  image: string;
};

type Props = {
  select: (genre: string) => void;
};

export default function Genres({ select }: Props) {
  return (
    <div
      className="
      mx-4 grid h-min grid-cols-1 gap-10 
      px-10 sm:mx-10 md:mx-16 md:grid-cols-2 xl:grid-cols-3 2xl:px-40
      "
    >
      {genres.map((item: Genre) => (
        <Card
          key={item.name}
          className="cursor-pointer transition duration-300 ease-in hover:bg-primary/50"
          onClick={() => select(item.name)}
        >
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Image
              src={item.image}
              alt={item.name}
              className="w-full"
              width={80}
              height={80}
            />
            <div className="w-full text-left">
              <div className="w-1/2">
                <Button onClick={() => select(item.name)}>PLAY</Button>
              </div>
            </div>

            <p className="text-xs">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
