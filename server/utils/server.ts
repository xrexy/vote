export type Server = NonNullable<Awaited<ReturnType<typeof _fetchServer>>>

const _fetchServer = (id: string) => db.query.server.findFirst({ where: (s, { eq }) => eq(s.id, id), })
const getKey = (id: string) => `self:fn-cache:fetchServer:${id}.json`

export const fetchServer = cachedFunction(
  (id: string) => _fetchServer(id),
  {
    getKey: (id: string) => id,
    base: 'self',
    group: 'fn-cache',
    name: 'fetchServer',
  })

export const deleteServerCache = (id: string) => {
  const storage = useStorage();
  if (!storage) throw new Error('Storage not available');

  return storage.removeItem(getKey(id));
}

export const updateServerCache = async (id: string, newData: Omit<Partial<Server>, 'id'>) => {
  const storage = useStorage();
  if (!storage) throw new Error('Storage not available');

  const key = getKey(id);
  const serverMeta = await storage.getItem<any>(key);
  if (!serverMeta) throw new Error('Server not found in cache');

  const updatedServer = { ...serverMeta, value: { ...serverMeta.value, ...newData } };
  storage.setItem(key, updatedServer);
}
