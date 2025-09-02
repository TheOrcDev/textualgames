import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Theme } from "./themes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRandomElement = (array: string[]) =>
  array[Math.floor(Math.random() * array.length)];

export const themes = [
  { name: Theme.Default, color: "#000" },
  { name: Theme.Sega, color: "#0055a4" },
  { name: Theme.Gameboy, color: "#8bac0f" },
  { name: Theme.Atari, color: "#7a4009" },
  { name: Theme.Nintendo, color: "#104cb0" },
  { name: Theme.Arcade, color: "#F07CD4" },
  { name: Theme.NeoGeo, color: "#dc2626" },
  { name: Theme.SoftPop, color: "#4B3F99" },
  { name: Theme.Pacman, color: "#ffcc00" },
  { name: Theme.VHS, color: "#8B5CF6" },
  { name: Theme.Cassette, color: "#8B5A2B" },
];
