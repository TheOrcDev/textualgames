"use client";

import { Button } from "@/components";
import { genres } from "@/libs/data";
import Image from "next/image";
import { useState } from "react";

type Genre = {
  name: string;
  description: string;
  image: string;
};

type Props = {
  select: (genre: string) => void;
};

export default function Genres({ select }: Props) {
  const [currentItems, setCurrentItems] = useState(genres.slice(0, 15));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-4 sm:mx-10 md:mx-32 h-min px-10 xl:px-24 2xl:px-40">
      {currentItems.map((item: Genre, index: number) => (
        <div className="flex flex-col items-center" key={index}>
          <Image
            src={item.image}
            alt={item.name}
            className="w-full"
            width={80}
            height={80}
          />
          <div className="text-left w-full my-3">{item.name.toUpperCase()}</div>
          <div className="w-full text-left">
            <div className="w-1/2">
              <Button content="PLAY" onClick={() => select(item.name)} />
            </div>
          </div>

          <p className="text-xs mt-3">{item.description}</p>
        </div>
      ))}
      {genres.length > 15 && currentItems.length !== genres.length && (
        <Button
          content="More..."
          onClick={() => {
            setCurrentItems(genres.slice(0, currentItems.length + 15));
          }}
          color="bg-slate-400"
        />
      )}
    </div>
  );
}
