import { Lucia } from "lucia";
import { webcrypto } from "node:crypto";

export const lucia = new Lucia(luciaDbAdapter, {
  sessionCookie: {
    attributes: { secure: !process.dev },
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

globalThis.crypto = webcrypto as Crypto;

