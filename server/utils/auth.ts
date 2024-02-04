import { Lucia } from "lucia";

interface DatabaseUserAttributes {
	username: string;
}

export const lucia = new Lucia(luciaDbAdapter, {
  sessionCookie: {
    attributes: { secure: !process.dev },
  },
  getUserAttributes: (attr) => ({
    username: attr.username,
  })
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
