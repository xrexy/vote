import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  username: text("username").unique().notNull().unique(),
  password: text("hashed_password").notNull(),

  uuid: text("mc_uuid").unique(), // uuid is only set when the user links his account
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

export const dbTables = {
  user: userTable,
  session: sessionTable,
};
