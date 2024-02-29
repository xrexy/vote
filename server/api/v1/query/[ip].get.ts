import { z } from "zod"

const BASE_URL = "https://api.mcsrvstat.us/3"


const schema = z.object({
  // zod is the dogshit of thje dog's shit
  // TODO add valibot
  // ip: z.string().ip({ version: 'v4' }).or(z.string().url())
  ip: z.string()
})

// /query/:ip
export default eventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, params => {
    console.log(params);
    return schema.safeParse(params)
  })

  if (!result.success) {
    console.log(result.error)

    throw createError({
      message: 'Invalid IP',
      statusCode: 404
    })
  }

  const storage = useStorage('server-query');

  const { ip } = result.data
  const url = `${BASE_URL}/${ip}`
  try {
    const queryData: any = await $fetch(url)

    const cacheexpire = queryData.debug.cacheexpire
    storage.
    storage.setItem(ip, queryData, {
      
    })

  } catch (e) {
    console.error(e)
  }
})

