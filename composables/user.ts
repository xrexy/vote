import type { User } from "lucia";

export const useUser = () => useState<User | null>("user", () => null);
