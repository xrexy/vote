import { pgTable, text, timestamp, json, boolean } from "drizzle-orm/pg-core";

import { tags, countries } from "../../data";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull().unique(),
  password: text("hashed_password").notNull(),

  uuid: text("mc_uuid"), // uuid is only set when the user links his account
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const serverTable = pgTable("server", {
  id: text("id").primaryKey(),
  creatorId: text("creator_id")
    .references(() => userTable.id)
    .notNull(),

  title: text("title").notNull(),
  ip: json('ip').$type<{ java: string; bedrock?: string }>().notNull(),
  version: text("version").notNull(),
  description: text("description").notNull(),

  // TODO make tags.json and add an actual type
  tags: json("tags").$type<(keyof typeof tags)[]>().notNull(),
  socials: json("socials").$type<Partial<{
    website: string;
    youtube: string;
    instagram: string;
    discord: string;
    facebook: string;
    tiktok: string;
    twitter: string;
  }>>().notNull(),
  // TODO add an actual type
  country: text("country", {
    enum: countries
  }).notNull(),
  verified: boolean("verified").notNull().default(false)
})

export const dbTables = {
  user: userTable,
  session: sessionTable,
  server: serverTable
};
