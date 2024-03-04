import { Ratelimit } from "@upstash/ratelimit";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
})

export default eventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({
      message: "Unauthorized",
      statusCode: 401
    })
  }

  if(!user.isLinked) {
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
    limiter: Ratelimit.fixedWindow(1, "10 s"),
    analytics: true,
  });

  const { success } = await ratelimit.limit(`verification:regenerate:${id}:${user.id}`)
  if (!success) {
    throw createError({ statusCode: 429, message: "Rate limit exceeded" })
  }

  const body = await readBody(event);
  const v = schema.safeParse(body);
  if (!v.success) {
    throw createError({
      message: "Invalid Body",
      statusCode: 400
    })
  }

  const email = v.data.email
  const verificationRes = await createAndSetVerificationCode(event.context.redis, id)
  if (verificationRes.success === false) {
    throw createError({
      message: "Failed to create verification code",
      statusCode: 500
    })
  }

  await sendVerificationEmail(event.context.resend, email, verificationRes.code, 'regenerate', {})

  return { success: true }
})
