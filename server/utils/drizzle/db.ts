import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool();
export const db = drizzle(pool);
export const luciaDbAdapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);