<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <div>
          <p class="sr-only">
            {{ data.srText }}
          </p>
          <Icon
            :class="data.iconColor"
            size="1.5rem"
            :name="data.icon"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <div>
          <p class="text-lg">
            {{ data.tooltipContent }}
          </p>
          <NuxtLink
            to="/"
            class="text-emerald-400 text-sm"
          >
            * Learn more about server verification
          </NuxtLink>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
const $props = defineProps<{ verified: boolean }>()

const data = computed(() => {
  const verified = $props.verified;

  const srText = verified ? 'Server verified tick' : 'Server unverified warning'
  const icon = verified ? 'charm:circle-tick' : 'iconoir:xmark-circle'
  const tooltipContent = verified ? 'This server is verified' : 'This server is NOT verified'
  const iconColor = verified ? 'text-emerald-400' : 'text-red-400'
  return { srText, icon, tooltipContent, iconColor }
})
</script>
