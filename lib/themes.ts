export enum Theme {
  Tron = "tron",
  Ares = "ares",
  Clu = "clu",
  Athena = "athena",
  Aphrodite = "aphrodite",
  Poseidon = "poseidon",
}

export const GRID_THEMES = Object.values(Theme);

export const DEFAULT_THEME = Theme.Tron;

export function isGridTheme(theme?: string | null): theme is Theme {
  return GRID_THEMES.includes(theme as Theme);
}

export function normalizeTheme(theme?: string | null): Theme {
  return isGridTheme(theme) ? theme : DEFAULT_THEME;
}
