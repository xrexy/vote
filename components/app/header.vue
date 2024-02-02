<template>
  <header>
    <div class="border border-border flex flex-row justify-between items-center rounded-md p-2 mt-2 mx-2">
      <p class="font-bold text-2xl">
        MINECRAFT
      </p>
      <div>
        <Avatar
          class="border border-border"
          @click="callSonner"
        >
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner';

function callSonner() {
    toast.info("Event has been created", {
        description: "Hui HUi HYUI NA DADDY GOLEMIQ HUI"
    })
}
</script>

<style scoped>
</style>