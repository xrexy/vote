import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DB_CONNECTION_STRING!
});
pool.connect();

export const db = drizzle(pool, {
  schema: dbTables
});
export const luciaDbAdapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);
