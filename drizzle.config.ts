import type { Config } from 'drizzle-kit';

export default {
  schema: './server/utils/drizzle/tables.ts',
  out: './.drizzle/migrations',
  driver: 'pg',
  verbose: true,
  dbCredentials: { connectionString: process.env.DB_CONNECTION_STRING! },
} satisfies Config;