const REQUIRED_ENV_VARIABLES = ['REDIS_URL'] as const;
const missingEnvVariables = REQUIRED_ENV_VARIABLES.filter((env) => !process.env[env]);
if(missingEnvVariables.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVariables.join(", ")}`);
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/eslint-module",
    "@vueuse/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    "@pinia/nuxt",
    "nuxt-icon",
  ],
  devtools: { enabled: true },
  googleFonts: {
    families: {
      'DM+Sans': '400..1000',
      'DM+Mono': [400, 500],
      "DM+Serif+Display": true,
    },
    display: "swap",
  },
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  tailwindcss: { viewer: false },
  runtimeConfig: {
    redis: {
      url: process.env.REDIS_URL,
    }
  }
});