"use client";

import { Palette } from "lucide-react";

import { GRID_THEMES, Theme } from "@/lib/themes";

import { Button } from "@/components/ui/button";

import { useThemeConfig } from "./active-theme";

export function ModeSwitcher() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  const cycleTheme = () => {
    const currentIndex = GRID_THEMES.indexOf(activeTheme);
    const nextTheme =
      GRID_THEMES[(currentIndex + 1 + GRID_THEMES.length) % GRID_THEMES.length];
    setActiveTheme(nextTheme ?? Theme.Tron);
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="border-primary/40 bg-background/70 text-primary hover:bg-primary/10"
      onClick={cycleTheme}
      aria-label="Cycle Grid theme"
      title={`Theme: ${activeTheme}`}
    >
      <Palette className="size-4" />
    </Button>
  );
}
