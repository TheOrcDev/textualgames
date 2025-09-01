export const Genre = {
  FANTASY: "Fantasy",
  SCIFI: "Sci-Fi",
  DYSTOPIAN: "Dystopian",
} as const;
export type Genre = (typeof Genre)[keyof typeof Genre];
