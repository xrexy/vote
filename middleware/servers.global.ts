export default defineNuxtRouteMiddleware(async () => {
  const serverStore = useServers()

  try {
    const { all } = await useRequestFetch()("/api/v1/server/all", {
      method: 'get',
    })
    serverStore.value = all
  } catch (e) {
    console.error(e)
    serverStore.value = []
  }
})
