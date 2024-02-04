import type { RedisClient } from "./server/plugins/redis"

declare module 'h3' {
  interface H3EventContext {
    $redis: RedisClient
  }
}