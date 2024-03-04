<script setup lang="ts">
function onSubmit(body: any) {
  $toastFetch("/api/v1/server/create", {
    body: {
      server: {
        title: body.title,
        ip: {
          java: body.ip,
          bedrock: {
            address: "bedrock.myserver.com",
            port: 19132
          }
        },
        version: "2",
        description: "My server is the best server. Join now! My server is the best server. Join now!",
        tags: ["survival", "creative"],
        socials: {
          website: "https://myserver.com",
          discord: "https://discord.gg/myserver",
          instagram: "https://instagram.com/myserver",
          youtube: "https://youtube.com/myserver",
          tiktok: "https://tiktok.com/myserver",
          facebook: "https://facebook.com/myserver",
          twitter: "https://twitter.com/myserver"
        },
        country: "US"
      },
      email: body.email,
    },
    method: 'POST'
  })
}
</script>

<template>
  <div
    class="pb-16 pt-12 h-[calc(100dvh-var(--header-height))] w-[45dvw] mx-auto flex flex-row justify-between items-center"
  >
    <Card class="h-full flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Add new server</CardTitle>
        <CardDescription>Enter your server information</CardDescription>
      </CardHeader>
      <CardContent class="scroll-smooth mb-6 pb-0 flex-1 h-full overflow-scroll">
        <FormKit
          type="form"
          :actions="false"
          @submit="onSubmit"
        >
          <div class="w-full sm:flex-row gap-x-2">
            <FormKit
              type="text"
              name="title"
              label="Title"
              validation="required|length:3,16"
              help="* Players will be able to find your server by this name"
            />

            <FormKit
              type="text"
              name="ip"
              placeholder="play.example.com"
              label="Java IP"
              validation="required"
            />

            <FormKit
              type="email"
              name="email"
              label="Email"
              validation="required"
              help="* We will send the verification code to this email"
            />
          </div>

          <div class="flex items-center gap-2 w-full">
            <Button
              class="w-full my-2"
              type="submit"
            >
              Add
            </Button>
          </div>
        </FormKit>
      </CardContent>
    </Card>
  </div>
</template>
