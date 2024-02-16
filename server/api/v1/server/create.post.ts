import { z } from "zod";
import { generateId } from 'lucia'
 
import { countries, tagKeys } from "~/server/data";

const serverSchema = z.object({
  title: z.string().min(8),
  ip: z.object({
    // TODO add proper schema for ips (can be ipv4 or url)
    java: z.string().min(8),
    bedrock: z.string().optional()
  }),
  // TODO add proper schema for versions (should support "ranges" as well) (e.g version idx 0:15, 15, 15:)
  // 0:15 => from 0 to 15 (inclusive)
  // 15 => exactly 15
  // 15: => from 15 to latest (15+)
  version: z.string(),
  description: z.string().min(50).max(1000),
  tags: z.enum(tagKeys).array().max(5),
  socials: z.object({
    website: z.string().url(),
    discord: z.string().url(),
    instagram: z.string().url(),
    youtube: z.string().url(),
    tiktok: z.string().url(),
    facebook: z.string().url(),
    twitter: z.string().url()
  }).partial(),
  country: z.enum(countries)
})

export default eventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized"
    })
  }

  const body = await readBody(event)

  const valid = serverSchema.safeParse(body)
  if (!valid.success) {
    throw createError({
      message: "Invalid payload",
      statusCode: 400
    })
  }
  const { data } = valid;

  try {
    const id = generateId(15)
    console.log(data);
    await db.insert(serverTable).values({
      ...data,
      id,
      creatorId: user.id
    })
  } catch (e) {
    console.log(e)
  }
})
