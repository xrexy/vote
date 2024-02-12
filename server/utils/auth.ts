import { Lucia } from "lucia";

interface DatabaseUserAttributes {
	username: string;
  uuid: string | undefined;
}

export const lucia = new Lucia(luciaDbAdapter, {
  sessionCookie: {
    attributes: { secure: !process.dev },
  },
  getUserAttributes: (attr) => ({
    username: attr.username,
    uuid: attr.uuid
  })
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
