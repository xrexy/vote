<template>
  <div class="grid place-items-center rounded-full relative w-[48px] h-[48px] p-[2px] border border-border">
    <Skeleton
      v-if="!imageSource"
      class="w-full h-full aspect-square rounded-full"
    />
    <Avatar
      v-else
      class="border border-border w-full h-full"
    >
      <AvatarImage :src="imageSource" />
    </Avatar>
    <div
      v-if="!user.uuid"
      class="absolute bottom-[2px] right-[2px] z-100 bg-red-500 h-[10px] aspect-square rounded-full animate-ping duration-1000"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from "lucia";
const $props = defineProps<{ user: User }>();

const imageSource = ref<string | null>(null)
watchEffect(async () => {
  const uuid = $props.user.uuid
  const res = await $fetch<Blob>(`https://crafatar.com/avatars/${uuid || 'eb351c77-3f4c-40e2-8f80-270cbb7cce24'}`, {
    responseType: 'blob',
  })

  imageSource.value = URL.createObjectURL(res)
})
</script>
