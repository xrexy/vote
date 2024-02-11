<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});

const body = reactive({
  username: "",
  password: "",
});

const { execute: login } = useFetch("/api/auth/login", {
  method: "POST",
  body,
  immediate: false,
  watch: false,
  onResponse: ({ response }) => {
    if (response.ok) navigateTo("/");
  },
});
</script>

<template>
  <div class="w -full flex flex-col justify-center items-center">
    <div class="flex flex-col items-center">
      <h1 class="text-xl sm:text-2xl font-black tracking-wider">
        Login
      </h1>
      <p class="opacity-50 text-sm">
        TODO Enter your email and password to login
      </p>
    </div>

    <FormKit
      type="form"
      form-class="sm:w-[20rem] flex flex-col gap-8 pt-8"
      :actions="false"
    >
      <div>
        <FormKit
          type="text"
          name="username"
          label="Username"
          prefix-icon="happy"
          placeholder="Example"
          validation="required|length:3,16"
          help="Will be used when linking your Minecraft account."
        />

        <FormKit
          type="password"
          name="password"
          prefix-icon="password"
          suffix-icon="eyeClosed"
          suffix-icon-class="cursor-pointer"
          :placeholder="Array(16).fill('•').join('')"
          label="Password"
          validation="required|length:6"
          @suffix-icon-click="togglePasswordVisibility"
        />
      </div>

      <div class="flex flex-col gap-2">
        <div class="-mt-2 w-full flex items-center justify-center">
          <NuxtLink
            to="/register"
            class="text-sm underline decoration-transparent transition-all duration-150 hover:decoration-emerald-500 hover:text-emerald-400 underline-offset-4"
          >
            Don't have an account?
          </NuxtLink>
        </div>

        <SeparatorWithText text="or..." />

        <Button
          class="w-full font-black brightness-125"
          variant="outline"
          type="submit"
        >
          Sign In
        </Button>
      </div>
    </FormKit>
  </div>
</template>

