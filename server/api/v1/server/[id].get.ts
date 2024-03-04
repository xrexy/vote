
import { H3Error } from 'h3'

export default eventHandler(async (event) => {
  try {
    const params = getRouterParams(event)
    if (typeof params.id !== 'string') throw new Error('missing id')

    const server = await fetchServer(params.id)
    if (!server) {
      throw createError({
        status: 404,
        message: 'Server not found'
      })
    }
    return server
  } catch (e) {
    if (e instanceof H3Error) throw e;

    console.error('error fetching user owned servers', e)
    throw createError({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}) 
