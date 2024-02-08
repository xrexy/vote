<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});
const body = reactive({
  username: "",
  password: "",
});

const { execute: signup } = useFetch("/api/auth/signup", {
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
  <div class="w-full flex flex-col justify-center items-center h-full">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-black tracking-wider">
        Register
      </h1>
      <p class="opacity-50 text-sm">
        Enter your email, password, and username to register
      </p>
    </div>

    <FormKit
      type="form"
      form-class="w-[20rem] flex flex-col gap-8 pt-8"
      :actions="false"
    >
      <div>
        <FormKit
          type="text"
          name="email"
          label="Email"
          prefix-icon="email"
          placeholder="email@example.com"
          validation="required|email"
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

      <div class="flex flex-col gap-4">
        <div class="-mt-2 w-full flex items-center justify-center">
          <NuxtLink
            to="/login"
            class="text-sm underline decoration-transparent transition-all duration-150 hover:decoration-emerald-500 hover:text-emerald-400 underline-offset-4"
          >
            Already have an account?
          </NuxtLink>
        </div>
      
        <div class="flex items-center gap-2 w-full">
          <Separator class="flex-1" />
          <p class="text-border brightness-150 pb-[4px] select-none">
            ...or
          </p>
          <Separator class="flex-1" />
        </div>


        <Button
          class="w-full font-black brightness-125"
          variant="outline"
          type="submit"
        >
          Sign Up
        </Button>
      </div>
    </FormKit>
  </div>
</template>

