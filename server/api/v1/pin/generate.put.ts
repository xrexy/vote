import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3)
    .refine((v) => !v.includes(" "), {
      message: "Username cannot contain spaces",
    }),
  uuid: z.string().uuid(),
});

export default eventHandler(async (event) => {
  const authorization = getHeader(event, "Authorization");
  if (
    !process.dev &&
    (!authorization || useRuntimeConfig(event).pin.secret !== authorization)
  ) {
    throw createError({
      status: 403,
      message: "Unauthorized",
    });
  }

  const v = schema.safeParse(await readBody(event));
  if (!v.success) {
    throw createError({
      status: 400,
      message: "Invalid request body",
    });
  }

  const body = v.data;
  const pin = generatePin();

  const key = getPinKey(body.username);
  const data: PinEntry = {
    pin,
    uuid: body.uuid,
  };

  const dragonfly = event.context.redis;
  try {
    await dragonfly.json.set(key, "$", data);
    await dragonfly.expire(key, 60 * 10, "GT");
  } catch (error) {
    console.log(error)
    throw createError("Internat Server Error");
  }

  return pin;
});

