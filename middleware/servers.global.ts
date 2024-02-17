export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser();
  if(!user.value) return;

  const serversStore = useUserServers();
  const res = await useRequestFetch()("/api/v1/server/user-owned");

  serversStore.value = res.servers;
});
