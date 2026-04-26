import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Theme } from "./themes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const themes = [
  { name: Theme.Tron, label: "Tron", color: "#00d4ff" },
  { name: Theme.Ares, label: "Ares", color: "#ff3333" },
  { name: Theme.Clu, label: "Clu", color: "#ff6600" },
  { name: Theme.Athena, label: "Athena", color: "#ffd700" },
  { name: Theme.Aphrodite, label: "Aphrodite", color: "#ff1493" },
  { name: Theme.Poseidon, label: "Poseidon", color: "#0066ff" },
];
