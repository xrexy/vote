const REQUIRED_ENV_VARIABLES = [
  "REDIS_URL",
  "DB_CONNECTION_STRING",
  "PIN_SECRET",
] as const;
const missingEnvVariables = REQUIRED_ENV_VARIABLES.filter(
  (env) => !process.env[env]
);
if (missingEnvVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVariables.join(", ")}`
  );
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@nuxtjs/eslint-module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "shadcn-nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
    "@formkit/nuxt",
    "nuxt-typed-router",
    "@nuxt/fonts"
  ],
  devtools: { enabled: true },
  formkit: { autoImport: true },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  tailwindcss: { viewer: false },
  runtimeConfig: {
    redis: { url: process.env.REDIS_URL },
    db: { connectionString: process.env.DB_CONNECTION_STRING },
    pin: { secret: process.env.PIN_SECRET },
  },
});
