import type { User } from "lucia";

export const useUser = () => useState<User | null>("user", () => null);

useUser.data = () => {
  const user = useUser();
  const isLinked = computed(() => !!user.value?.uuid);

  return { isLinked };
};
