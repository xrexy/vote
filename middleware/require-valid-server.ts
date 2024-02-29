export default defineNuxtRouteMiddleware(async (event) => {
  if (typeof event.params.id !== 'string') return;

  const servers = useServers()
  const id = event.params.id;

  const isFound = servers.value.some((server) => server.id === id)
  if (!isFound) {
    return abortNavigation(createError({
      message: 'Invalid server id',
      statusCode: 400,
    }))
  }
});
