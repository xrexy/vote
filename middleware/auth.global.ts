const protectedRoutes: RegExp[] = [
  new RegExp('/studio/.*')
]

export default defineNuxtRouteMiddleware(async (to) => {
  let user: User;
  try {
    user = await $fetch("/api/auth/me");
  } catch {
    console.error("Failed to fetch user");
  }

  useUser().value = user;

  if (!user && protectedRoutes.some(exp => exp.test(to.path))) {
    return navigateTo("/login");
  }
});

