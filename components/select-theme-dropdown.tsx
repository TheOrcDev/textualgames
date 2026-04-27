"use client";

import { User } from "@/db/schema";

import { Theme, normalizeTheme } from "@/lib/themes";
import { cn, themes } from "@/lib/utils";

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
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {themes.map((theme) => {
        const selected =
          normalizeTheme(activeTheme || user.userConfigurations?.theme) ===
          theme.name;

        return (
          <button
            key={theme.name}
            type="button"
            onClick={() => {
              setActiveTheme(theme.name);
              handleThemeChange(theme.name);
            }}
            className={cn(
              "group relative flex min-h-10 items-center gap-2 overflow-hidden rounded border bg-background/60 px-2.5 py-2 text-left font-mono text-[10px] uppercase tracking-widest transition-all",
              selected
                ? "border-primary/70 bg-primary/15 text-primary shadow-[0_0_16px_color-mix(in_oklch,var(--glow)_22%,transparent)]"
                : "border-primary/20 text-foreground/70 hover:border-primary/45 hover:bg-primary/10 hover:text-primary",
            )}
            aria-pressed={selected}
          >
            <span className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <span
              aria-hidden
              className="relative size-3 shrink-0 rounded-sm border border-foreground/40"
              style={{ backgroundColor: theme.color }}
            />
            <span className="relative min-w-0 truncate">{theme.label}</span>
            {selected && (
              <span className="relative ml-auto hidden text-[9px] text-primary xl:inline">
                ACTIVE
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
