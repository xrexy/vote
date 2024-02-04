import { createClient } from "redis";

type RedisClient = Awaited<ReturnType<typeof makeClient>>

function makeClient(url: string) {
  const c = createClient({url})
  c.on("error", (err) => console.error("Received REDIS Error:\n", err))

  return c.connect()
}

export default defineNitroPlugin(async (nitro) => {
  const client = await makeClient(useRuntimeConfig().redis.url);

  // nitro.hooks.hookOnce("close", async () => {
  //   try {
  //     await client.disconnect()
  //     console.log('Disconnected Redis instance')
  //   } catch (e) {
  //     console.error('Error disconnecting Redis instance', e)
  //   }
  // });

  nitro.hooks.hook('request', (event) => {
    event.context.$redis = client;
  })
});


declare module "h3" {
	interface H3EventContext {
    redis: RedisClient
	}
}