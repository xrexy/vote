import type { User } from "lucia";

const protectedRoutes: (RegExp | string)[] = [
  new RegExp('/studio/.*'),
]

export default defineNuxtRouteMiddleware(async (to) => {
  let user: User | null = null;
  try {
    user = await $fetch("/api/auth/me");
  } catch {
    console.error("Failed to fetch user");
  }

  useUser().value = user;

  if (!user && protectedRoutes.some(exp => typeof exp === 'string' ? exp === to.path : exp.test(to.path))) {
    return navigateTo("/login");
  }
});

