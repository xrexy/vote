<template>
  <AlertDialog
    v-model:open="dialogIsOpen"
    @update:open="nextTick(() => confirmationInput = '')"
  >
    <AlertDialogTrigger as-child>
      <Button variant="ghost">
        <Icon
          name="material-symbols:delete-rounded"
          size="1.05rem"
        />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete
          <strong class="text-emerald-400">{{ server.title }}</strong>
          and all of its data.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <FormKit
          id="confirmation-input"
          v-model="confirmationInput"
          :placeholder="server.title"
          :help="`Type the server title to confirm action.`"
          @keydown.enter="() => {
            if (confirmationInput !== server.title) return
            
            dialogIsOpen = false
            handleDelete()
          }"
        />
        <AlertDialogAction
          :disabled="confirmationInput !== server.title"
          @click="handleDelete"
        >
          Continue
        </AlertDialogAction>

        <AlertDialogCancel class="absolute top-2 right-2 border-none px-0 h-6 bg-transparent hover:bg-foreground/5">
          <Icon
            name="material-symbols-light:close-small"
            size="1.65rem"
          />
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'

const userServers = useUserServers();
const $props = defineProps<{
  server: Server
}>()

const dialogIsOpen = ref(false);
const confirmationInput = ref("")
const isDeleting = ref(false)

function handleDelete() {
  if (confirmationInput.value !== $props.server.title) return

  isDeleting.value = true
  toast.promise(async () => {
    const id = $props.server.id
    await $fetch('/api/v1/server/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id })
    })

    userServers.value = userServers.value.filter((server) => server.id !== id)

    isDeleting.value = false
  }, {
    loading: "Deleting server...",
    success: () => "Server deleted.",
    error: () => "Failed to delete server."
  })
}

// Close the dialog if the server is being deleted
watch(dialogIsOpen, (isOpen) => {
  if (isOpen && isDeleting.value) {
    dialogIsOpen.value = false
  }
}, {
  flush: 'pre'
})
</script>
