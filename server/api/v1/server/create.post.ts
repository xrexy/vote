import { z } from "zod";
import { generateId } from 'lucia'

import { countries, tagKeys } from "~/server/data";

/*
{
  "title": "my server",
  "ip": {
    "java": "play.myserver.com",
    "bedrock": {
      "address": "bedrock.myserver.com",
      "port": 19132
    }
  },
  "version": "2",
  "description": "My server is the best server. Join now! My server is the best server. Join now!",
  "tags": ["survival", "creative"],
  "socials": {
    "website": "https://myserver.com",
    "discord": "https://discord.gg/myserver",
    "instagram": "https://instagram.com/myserver",
    "youtube": "https://youtube.com/myserver",
    "tiktok": "https://tiktok.com/myserver",
    "facebook": "https://facebook.com/myserver",
    "twitter": "https://twitter.com/myserver"
  },
  "country": "US"
}
*/


const serverSchema = z.object({
  title: z.string().min(8),
  ip: z.object({
    // TODO add proper schema for ips (can be ipv4 or url)
    java: z.string().min(8),
    bedrock: z.object({
      address: z.string().min(8),
      port: z.number().int().min(1).max(65535)
    }).optional()
  }),
  // TODO add proper schema for versions (should support "ranges" as well) (e.g version idx 0:15, 15, 15:)
  // 0:15 => from 0 to 15 (inclusive)
  // 15 => exactly 15
  // 15: => from 15 to latest (15+)
  version: z.string(),
  description: z.string().min(25).max(1000),
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

const schema = z.object({
  server: serverSchema,
  email: z.string().email()
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

  const valid = schema.safeParse(body)
  if (!valid.success) {
    throw createError({
      message: valid.error.errors[0].message,
      statusCode: 400
    })
  }
  const { data: { server, email } } = valid;

  try {
    const id = generateId(15)

    const verificationRes = await createAndSetVerificationCode(event.context.redis, id)
    if (verificationRes.success === false) {
      throw createError({
        message: "Failed to create verification code",
        statusCode: 500
      })
    }

    await sendVerificationEmail(event.context.resend, email, verificationRes.code, 'new', { serverTitle: server.title })

    await db.insert(serverTable).values({
      ...server,
      verified: false,
      id,
      creatorId: user.id
    })

    return { id }
  } catch (e) {
    console.log(e)
  }
})
