
// TODO caching
export default eventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      status: 401,
      message: 'Unauthorized'
    })
  }

  try {
    const res = await db.query.server.findMany({
      where: (server, { eq }) => eq(server.creatorId, user.id)
    })

    return { servers: res, count: res.length }
  } catch (e) {
    console.error('error fetching user owned servers', e)
    throw createError({
      status: 500,
      message: 'Internal Server Error'
    })
  }
}) 
