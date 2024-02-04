export default defineNuxtRouteMiddleware(async () => {
  useUser().value = await $fetch("/api/auth/me");
});

