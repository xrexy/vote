<script lang="ts" setup>
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
  <div>
    <h1>Create an account</h1>
    <form
      class="text-gray-400"
      @submit.prevent="signup()"
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        v-model="body.username"
        name="username"
      >
      <br>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        v-model="body.password"
        type="password"
        name="password"
      >
      <br>
      <button>Continue</button>
    </form>
  </div>
</template>

