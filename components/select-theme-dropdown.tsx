"use client";

import { User } from "@/db/schema";

import { Theme } from "@/lib/themes";
import { themes } from "@/lib/utils";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/8bit/select";

import { useThemeConfig } from "./active-theme";

interface SelectThemeDropdownProps {
  user: User;
  onThemeChange?: (theme: Theme) => void;
}

export function SelectThemeDropdown({
  user,
  onThemeChange,
}: SelectThemeDropdownProps) {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  const handleThemeChange = async (theme: Theme) => {
    onThemeChange?.(theme);
  };

  return (
    <Select
      value={activeTheme || user.userConfigurations?.theme}
      onValueChange={(val) => {
        setActiveTheme(val as Theme);
        handleThemeChange(val as Theme);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue font="retro" placeholder="Select theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme.name} value={theme.name}>
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-sm border border-foreground"
                style={{ backgroundColor: theme.color }}
              />
              <span className="capitalize">{theme.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
