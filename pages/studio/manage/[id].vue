<template>
  <div class="py-8 h-[calc(100dvh-var(--header-height))] w-[50dvw] mx-auto flex flex-row justify-between items-center">
    <Card class="h-full flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Manage Server</CardTitle>
      </CardHeader>
      <CardContent
        v-if="server"
        class="scroll-smooth mb-6 pb-0 flex-1 h-full overflow-scroll"
      >
        <Alert v-if="!server.verified">
          <Icon
            name="fluent:text-bullet-list-square-warning-16-regular"
            size="1.5rem"
            class="!text-emerald-400"
          />
          <AlertTitle class="font-bold">
            Server not published
          </AlertTitle>
          <AlertDescription class="opacity-50">
            This server is not yet published, please verify the server to make it public.
          </AlertDescription>
          <NuxtLink
            to="/"
            class="text-emerald-400 text-xs"
          >
            * Read more about server verification
          </NuxtLink>
        </Alert>

        <h1 class="text-4xl font-black w-full text-center my-8">
          WORK IN PROGRESS
        </h1>
      </CardContent>
      <CardContent
        v-else
        class="scroll-smooth mb-6 pb-0 flex-1 h-full overflow-scroll"
      >
        <p v-if="error">
          {{ error }}
        </p>
        <p v-else>
          Loading...
        </p>
      </CardContent>
    </Card>
  </div>
</template>


<script setup lang="ts">
const route = useRoute('studio-manage-id');
const id = route.params.id;

const user = useAuthenticatedUser()
const servers = useServers()
const { data: server, error } = await useAsyncData(`server-${id}`, async () => {
  const found = servers.value.find((server) => server.id === id);
  if (found) return found;

  const reqServer = await $fetch(`/api/v1/server/:id`, {
    method: 'get',
    params: { id }
  })

  if (!reqServer) {
    await navigateTo('/studio')
    return null;
  }

  return reqServer;
})

watch(server, s => {
  if (s && s.creatorId !== user.value.id) {
    navigateTo('/studio')
  }
})
</script>
