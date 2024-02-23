"use client";

import { Button } from "@/components";
import { useState } from "react";

type Props = {
  items: string[];
  select: (genre: string) => void;
};

export default function SelectItems({ items, select }: Props) {
  const [currentItems, setCurrentItems] = useState(items.slice(0, 15));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-4 sm:mx-10 md:mx-32">
      {currentItems.map((item: string, index: number) => (
        <div className="flex items-center h-min" key={index}>
          <Button content={item} onClick={() => select(item)} />
        </div>
      ))}
      {items.length > 15 && currentItems.length !== items.length && (
        <Button
          content="More..."
          onClick={() => {
            setCurrentItems(items.slice(0, currentItems.length + 15));
          }}
          color="bg-yellow-100"
        />
      )}
    </div>
  );
}
