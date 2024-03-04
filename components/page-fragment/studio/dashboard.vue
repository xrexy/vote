<template>
  <div class="grid grid-cols-2 gap-6">
    <!-- TODO scroll behaviour -->
    <div
      v-for="(server, idx) in servers"
      :key="server.id"
      class="w-full rounded-md border border-border"
    >
      <NuxtImg
        class="w-full aspect-[32/5] object-center h-auto rounded-t-md"
        src="/images/test_banner.jpg"
      />
      <div class="p-4 pt-1">
        <!-- Title -->
        <div class="flex items-center justify-between w-full ">
          <div class="flex gap-1">
            <ServerVerifiedStatus :verified="server.verified" />
            <NuxtLink
              :to="`/studio/manage/${server.id}`"
              class="text-lg font-semibold"
            >
              {{ server.title }}
            </NuxtLink>
          </div>

          <div class="flex items-center gap-2">
            <div class="bg-emerald-400 h-2 aspect-square rounded-full animate-pulse" />
            <p class="text-sm font-semibold">
              {{ (idx + 1) * 4 * generateRandomInteger(20) }}/{{ (idx + 1) * 120 }}
            </p>
          </div>
        </div>

        <div class="flex gap-1 pt-1">
          <ServerTag
            v-for="tag in server.tags"
            :key="tag"
            :tag="tag"
          />
        </div>

        <Separator class="my-4 opacity-75" />

        <div class="flex items-end justify-between">
          <div class="text-muted-foreground">
            <Button
              variant="ghost"
              class="-ml-2 px-3 h-6 hover:text-emerald-400"
              @click="copy"
            >
              {{ server.ip.java }}
            </Button>

            <template v-if="server.ip.bedrock">
              <Separator class="my-1 opacity-50" />

              <div class="">
                <Button
                  variant="ghost"
                  class="-ml-2 px-3 h-6 hover:text-emerald-400"
                  @click="copy"
                >
                  {{ server.ip.bedrock.address }}
                </Button>
                <span class="select-none text-muted-foreground/50">:</span>
                <Button
                  variant="ghost"
                  class="px-3 h-6 hover:text-emerald-400"
                  @click="copy"
                >
                  {{ server.ip.bedrock.port }}
                </Button>
              </div>
            </template>
          </div>

          <div>
            <ServerDeleteButton :server="server" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateRandomInteger } from 'oslo/crypto';
import type { Separator } from 'radix-vue';
import { toast } from 'vue-sonner'

const originalServers = useUserServers()

const duplicationCount = 1;
const servers = computed<Server[]>(() => Array(duplicationCount).fill(originalServers.value).flat())

function copy(e: MouseEvent) {
  const txt = (e.target as HTMLElement).textContent;
  if (txt) {
    navigator.clipboard.writeText(txt);
    toast.info('Copied to clipboard!')
  }
}
</script>
