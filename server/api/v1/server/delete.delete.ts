import { and, eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  id: z.string()
})

export default eventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      message: 'Unauthorized',
      statusCode: 401
    })
  }

  const v = schema.safeParse(await readBody(event));
  if (!v.success) {
    throw createError({
      message: 'Invalid request',
      statusCode: 400
    })
  }

  const { id } = v.data;

  try {
    const sameCreatorSQL = and(eq(serverTable.id, id), eq(serverTable.creatorId, user.id))
    // TODO use a cachedFunction instead of a direct call
    const server = await db.query.server.findFirst({
      where: sameCreatorSQL
    })

    if (!server) {
      throw createError({
        message: 'Server not found',
        statusCode: 404
      })
    }

    const deleteRes = await db.delete(serverTable).where(sameCreatorSQL);
    if (deleteRes.rowCount === 0) {
      throw createError({
        message: 'Server not found',
        statusCode: 404
      })
    }

    setResponseStatus(event, 204)
  } catch (e) {
    console.error('Error while fetching server', id, e)
    throw createError({
      message: 'Internal server error',
      statusCode: 500
    })
  }
})
