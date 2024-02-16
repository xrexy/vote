<script setup lang="ts">
import { ref } from 'vue'
import { PinInputInput, PinInputRoot } from 'radix-vue'
import { generateRandomInteger } from 'oslo/crypto';

defineEmits<{ complete: [string[]] }>()

defineProps<Partial<{
  class: string
  classInput: string
}>>()
</script>

<template>
  <PinInputRoot id="pin-input" type="number" otp :class="cn('flex gap-2 items-center mt-1', $props.class)"
    @complete="$emit('complete', $event)">
    <PinInputInput v-for="(id, index) in 6" :key="id" :placeholder="generateRandomInteger(9)" :index="index" :class="cn('w-10 h-10 border border-border bg-background rounded placeholder:text-muted text-center focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-400/75',
      $props.classInput)" />
  </PinInputRoot>
</template>
