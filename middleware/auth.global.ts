
const protectedRoutes: (RegExp | string)[] = [new RegExp("/studio/.*")];

export default defineNuxtRouteMiddleware(async (to) => {
	const user = useUser();
  // NOTE: has to be useFetch cause $fetch doesn't handle cookies correctly
	const { data } = await useFetch("/api/auth/me");
	if (data.value) {
		user.value = data.value;
	}

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

