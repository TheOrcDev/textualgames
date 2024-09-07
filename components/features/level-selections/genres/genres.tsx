import Image from "next/image";

import { genres } from "@/components/shared/data";
import { Genre } from "@/components/shared/types";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";

type GenreItem = {
  name: Genre;
  description: string;
  image: string;
};

type Props = {
  select: (genre: Genre) => void;
};

export default function Genres({ select }: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
      {genres.map((item: GenreItem) => (
        <Card
          key={item.name}
          className="cursor-pointer from-primary/40 to-transparent transition duration-300 ease-in hover:-translate-y-2 hover:bg-gradient-to-br"
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
