import { Theme } from "@/lib/themes";
import { UIMessage } from "ai";
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
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

export const games = pgTable("games", {
  id: uuid("id").primaryKey().defaultRandom(),
  genre: text("genre").notNull(),
  choice: text("choice").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Game = typeof games.$inferSelect & {
  levels: (typeof levels.$inferSelect)[];
  character: typeof characters.$inferSelect;
  chat?: typeof chats.$inferSelect;
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

export type Choice = {
  text: string;
};

export const levels = pgTable("levels", {
  id: uuid("id").primaryKey().defaultRandom(),
  level: text("level").notNull(),
  image: text("image").notNull(),
  choices: jsonb("choices").$type<Choice[]>().notNull(),
  storyline: text("storyline").notNull(),
  gameId: uuid("game_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const gamesRelations = relations(games, ({ many, one }) => ({
  levels: many(levels),
  character: one(characters),
  chats: many(chats),
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

export const user = pgTable("user", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').$defaultFn(() => false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export enum Subscription {
  FREE = "free",
  PRO = "pro",
}

export const subscriptionEnum = pgEnum("subscription", Object.values(Subscription) as [string, ...string[]]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
  polarProductId: text("polar_product_id").notNull(),
  slug: text("slug").notNull(),
  tier: subscriptionEnum("subscription").notNull().default(Subscription.FREE),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type SelectSubscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

export const userUsage = pgTable("user_usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id),
  levelsCompleted: integer("levels_completed").notNull().default(0),
  lastResetDate: timestamp("last_reset_date").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const usageLimits = pgTable("usage_limits", {
  id: uuid("id").primaryKey().defaultRandom(),
  tier: subscriptionEnum("subscription").notNull().default(Subscription.FREE),
  maxLevels: integer("max_levels").notNull(),
  maxTokens: integer("max_tokens").notNull(),
  features: jsonb("features").$type<string[]>(), // ["chat", "unlimited_games", etc.]
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(user, {
    fields: [subscriptions.userId],
    references: [user.id],
  }),
}));

export type User = typeof user.$inferSelect & {
  userConfigurations: typeof userConfigurations.$inferSelect | null;
};
export type InsertUser = typeof user.$inferInsert;

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  verification: many(verification),
  userConfigurations: one(userConfigurations),
  subscriptions: one(subscriptions),
}));

export const session = pgTable("session", {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = pgTable("account", {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
});

export const chats = pgTable("chats", {
  id: uuid("id").primaryKey().defaultRandom(),
  chatId: text("chat_id").notNull().unique(),
  gameId: uuid("game_id").notNull().references(() => games.id, { onDelete: 'cascade' }),
  messages: jsonb("messages").$type<UIMessage[]>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userConfigurations = pgTable("user_configurations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
  theme: text("theme").notNull().$type<Theme>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userConfigurationsRelations = relations(userConfigurations, ({ one }) => ({
  user: one(user, {
    fields: [userConfigurations.userId],
    references: [user.id],
  }),
}));

export type UserConfiguration = typeof userConfigurations.$inferSelect;
export type InsertUserConfiguration = typeof userConfigurations.$inferInsert;

export const chatsRelations = relations(chats, ({ one }) => ({
  game: one(games, {
    fields: [chats.gameId],
    references: [games.id],
  }),
}));

export const schema = { user, session, account, verification, chats };
