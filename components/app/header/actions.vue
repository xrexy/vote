<template>
  <NuxtLink to="/studio/new-plugin">
    <Button
      variant="outline"
      title="Studio"
      class="px-4 h-full gap-2"
      @click.stop="() => { }"
    >
      <Icon
        name="material-symbols:add-rounded"
        size="24"
        class="text-foreground/50"
      />
      Studio
    </Button>
  </NuxtLink>
</template>

<script lang="ts" setup>

</script>
