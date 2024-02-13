const path = new RegExp("/settings/.*");

export default defineNuxtRouteMiddleware(async (to) => {
  if (!path.test(to.path)) return;

  const user = useUser();
  if (!user) return navigateTo("/login");
});

