const REQUIRED_ENV_VARIABLES = [
  "DB_CONNECTION_STRING",
  "PIN_SECRET",
  "RESEND_API_KEY",
  "UPSTASH_REDIS_REST_TOKEN",
  "UPSTASH_REDIS_REST_URL"
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
    redis: { token: process.env.UPSTASH_REDIS_REST_TOKEN!, url: process.env.UPSTASH_REDIS_REST_URL! },
    db: { connectionString: process.env.DB_CONNECTION_STRING },
    pin: { secret: process.env.PIN_SECRET },
    resend: { apiKey: process.env.RESEND_API_KEY },
  },
});
