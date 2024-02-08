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

  if(!user) {
    const next = to.path;
    const pathIsProtected = protectedRoutes.some(exp => typeof exp === 'string' ? exp === next : exp.test(next));

    if(pathIsProtected) {
      return navigateTo("/login");
    }
  }
});

