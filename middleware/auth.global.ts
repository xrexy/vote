
const protectedRoutes: (RegExp | string)[] = [new RegExp("/studio/.*")];

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUser();
  const user = await useRequestFetch()("/api/auth/me");
  userStore.value = user

  if (!user) {
    const next = to.path;
    const pathIsProtected = protectedRoutes.some((exp) =>
      typeof exp === "string" ? exp === next : exp.test(next)
    );

    if (pathIsProtected) {
      return navigateTo("/login");
    }
  }
});

