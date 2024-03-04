import { Redis } from "@upstash/redis";

export type RedisClient = Redis

export default defineNitroPlugin(async (nitro) => {
  const client = new Redis(useRuntimeConfig().redis);
  nitro.hooks.hook('request', (event) => {
    event.context.redis = client;
  })
});
declare module "h3" {
  interface H3EventContext {
    redis: RedisClient,
    resend: import('resend').Resend
  }
}
