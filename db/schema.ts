import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const purchases = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  paymentIntent: text("payment_intent").notNull(),
  paymentIntentSecret: text("payment_intent_secret").notNull().unique(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const tokenSpends = pgTable("token_spends", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  action: text("action").notNull(),
  amount: integer("amount").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  genre: text("genre").notNull(),
  choice: text("choice").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Game = typeof games.$inferInsert & {
  levels: (typeof levels.$inferSelect)[];
  character: (typeof characters.$inferSelect) | null;
};

export type Level = typeof levels.$inferSelect;

export const genderEnum = pgEnum("gender", ["male", "female"]);

export const characters = pgTable("characters", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  plot: text("plot").notNull(),
  type: text("type").notNull(),
  items: text("items").notNull(),
  gender: genderEnum("gender").default("male").notNull(),
  gameId: uuid("game_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const levels = pgTable("levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  level: text("level").notNull(),
  image: text("image").notNull(),
  choices: text("choices").notNull(),
  storyline: text("storyline").notNull(),
  gameId: uuid("game_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const gamesRelations = relations(games, ({ many, one }) => ({
  levels: many(levels),
  character: one(characters),
}));

export const levelsRelations = relations(levels, ({ one }) => ({
  game: one(games, {
    fields: [levels.gameId],
    references: [games.id],
  }),
}));

export const charactersRelations = relations(characters, ({ one }) => ({
  game: one(games, {
    fields: [characters.gameId],
    references: [games.id],
  }),
}));
