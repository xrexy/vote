const protectedRoutes: RegExp[] = [
  new RegExp('/studio/.*')
]

export default defineNuxtRouteMiddleware(async (to) => {
  const user = await $fetch("/api/auth/me");
  useUser().value = user;

  if (!user && protectedRoutes.some(exp => exp.test(to.path))) {
    return navigateTo("/login");
  }
});

