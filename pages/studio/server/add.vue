<template>
  <div
    class="pb-16 pt-12 h-[calc(100dvh-var(--header-height))] w-[55dvw] mx-auto flex flex-row justify-between items-center"
  >
    <Card class="h-full flex flex-col flex-1">
      <CardHeader>
        <CardTitle>Add new server</CardTitle>
        <CardDescription>Enter your server information</CardDescription>
      </CardHeader>
      <CardContent class="scroll-smooth mb-6 pb-0 flex-1 h-full overflow-scroll">
        <!-- Title -->
        <div class="">
          <FormKit
            type="text"
            name="title"
            label="Title"
            validation="required|length:3,16"
            help="* Players will be able to find your server by this name"
          />
        </div>


        <!-- Ip (java & bedrock) -->
        <!-- Version -->
        <!-- Description -->
        <!-- Tags -->
        <!-- Country -->
        <!-- Socials --> 
      </CardContent>
    </Card>
  </div>
</template>
