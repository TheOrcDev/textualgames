"use client";

import { useState } from "react";

import { Button } from "@/components/ui";

type Props = {
  items: string[];
  select: (genre: string) => void;
};

export default function SelectItems({ items, select }: Props) {
  const [currentItems, setCurrentItems] = useState(items.slice(0, 15));

  return (
    <div
      className="
      mx-4 grid grid-cols-1 gap-5
      sm:mx-10 sm:grid-cols-2 md:mx-32 md:grid-cols-3
      "
    >
      {currentItems.map((item: string, index: number) => (
        <div className="flex h-min items-center" key={index}>
          <Button
            className="h-40 w-full text-wrap"
            onClick={() => select(item)}
          >
            {item}
          </Button>
        </div>
      ))}
      {items.length > 15 && currentItems.length !== items.length && (
        <Button
          onClick={() => {
            setCurrentItems(items.slice(0, currentItems.length + 15));
          }}
        >
          More...
        </Button>
      )}
    </div>
  );
}
