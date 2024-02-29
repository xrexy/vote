// TODO pagination
// TODO filter
// TODO caching
export default eventHandler(async (event) => {
  const all = await db.query.server.findMany({
    orderBy: (s, { desc }) => desc(s.updatedAt),
  })

  return { all }
})
