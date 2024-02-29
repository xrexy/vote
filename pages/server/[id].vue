<template>
  <div class="w-[90%] mx-auto h-true-height p-8">
    <Card class="flex flex-col h-full border border-border *:rounded-md'">
      <!--Server Title | Verified-->
      <div class="flex justify-between w-full border-b border-border/70 p-4">
        <div class="flex items-center gap-2">
          <h1 class="text-3xl font-bold">
            {{ server.title }}
          </h1>
          <ServerVerifiedStatus :verified="server.verified" />
        </div>

        <div class="flex gap-2 items-center">
          <div
            v-if="query"
            class="flex items-center text-sm"
          >
            <Icon
              name="mdi:users"
              size="1.25rem"
              class="mr-1"
            />
            <p class="space-x-0.5">
              <span class="text-emerald-400">{{ format(query.players.online) }}</span>
              <span>/</span>
              <span>{{ format(query.players.max) }}</span>
            </p>
          </div>
          <div
            v-else
            class="flex items-center gap-1"
          >
            <Skeleton class="w-[35px] h-[15px]" />
            /
            <Skeleton class="w-[40px] h-[15px]" />
          </div>

          <Button
            class="h-fit px-6"
            variant="outline"
          >
            Vote
          </Button>
        </div>
      </div>

      <div class="flex flex-row *:p-2 *:px-4 *:h-full h-full justify-center items-center">
        <!--Server Info-->
        <div class="w-[75%]">
          <h3 class="font-semibold">
            Description
          </h3>
          <p class="font-mono">
            {{ server.description }}
          </p>
        </div>

        <!--Server Stats-->
        <div class="flex-1 border-l border-border/70">
          <h3 class="font-semibold">
            MOTD:
          </h3>
          <div
            v-if="query"
            class="font-mono border border-border rounded-md text-sm p-1.5"
          >
            <div
              v-for="line, k in query.motd.html"
              :key="k"
              class="tracking-wider whitespace-pre"
            >
              <span v-html="line" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
const BASE_URL = `https://mc-query-worker.xrexy.workers.dev`
definePageMeta({
  middleware: ['require-valid-server']
})

const numberFormatter = new Intl.NumberFormat('en-US')
function format(number: number) {
  return numberFormatter.format(number)
}

const servers = useServers()
const route = useRoute('server-id');
const server = ref(servers.value.find((server) => server.id === route.params.id)!)

const { data: query, pending, error } = useFetch<ServerQuery>(`${BASE_URL}/${server.value.ip.java}`, {
  immediate: true,
  server: false,
})

console.log(query)

</script>
