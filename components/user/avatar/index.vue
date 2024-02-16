<template>
  <div
    class="grid place-items-center rounded-full relative w-[48px] h-[48px] p-[2px] border border-border"
  >
    <Avatar class="border border-border w-full h-full">
      <AvatarImage
        :src="`https://crafatar.com/avatars/${
          user.uuid || 'eb351c77-3f4c-40e2-8f80-270cbb7cce24'
        }`"
      />
    </Avatar>
    <div
      v-if="!user.uuid"
      class="absolute bottom-[2px] right-[2px] z-100 bg-red-500 h-[10px] aspect-square rounded-full animate-ping duration-1000"
    />
  </div>
</template>

<script setup lang="ts">
import type { User } from "lucia";
defineProps<{ user: User }>();
</script>

