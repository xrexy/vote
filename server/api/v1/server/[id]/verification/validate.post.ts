import { Ratelimit } from "@upstash/ratelimit";
import { eq } from "drizzle-orm";
import { H3Error } from 'h3';

import { ServerQuery } from "~/utils/types";

const WORKER_URL = `https://mc-query-worker.xrexy.workers.dev`

export default eventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401
    })
  }

  if (!user.isLinked) {
    throw createError({
      message: "You must link your account to perform this action",
      statusCode: 403
    })
  }

  const params = getRouterParams(event);
  const id = params.id;
  if (typeof id !== "string") {
    throw createError({
      message: "Invalid server id",
      statusCode: 400
    })
  }

  const ratelimit = new Ratelimit({
    redis: event.context.redis,
    limiter: Ratelimit.fixedWindow(5, "10 s"),
    analytics: true,
  });

  const { success } = await ratelimit.limit(`verification:validate:${id}:${user.id}`)
  if (!success) {
    throw createError({ statusCode: 429, message: "Rate limit exceeded" })
  }

  try {
    const server = await fetchServer(id)
    if (!server) {
      throw createError({
        message: "Server not found",
        statusCode: 404
      })
    }

    if (server.creatorId !== user.id) {
      throw createError({
        message: "Unauthorized",
        statusCode: 401
      })
    }

    if (server.verified) {
      throw createError({
        message: "Server is already verified",
        statusCode: 400
      })
    }

    const verificationCode = await getVerificationCode(event.context.redis, id)
    if (!verificationCode) {
      throw createError({
        message: "Verification code is missing. Please regenerate it",
        statusCode: 500
      })
    }

    const query = await $fetch<ServerQuery>(`${WORKER_URL}/${server.ip.java}`);
    if (!query.motd) {
      throw createError({
        message: "Failed to query server",
        statusCode: 500
      })
    }

    const motd = query.motd.clean;
    const containsCode = motd.some((line) => line.includes(verificationCode))
    console.log(motd)
    if (!containsCode) {
      throw createError({
        message: "Verification code not found in server MOTD",
        statusCode: 404
      })
    }

    await db.update(serverTable).set({ verified: true }).where(eq(serverTable.id, id))
    await updateServerCache(id, { verified: true })

    return { success: true }
  } catch (e) {
    if (e instanceof H3Error) throw e

    console.error('server query validation failed', user.id, id, e)
    throw createError({
      message: "Failed to query server",
      statusCode: 500
    })
  }
})
