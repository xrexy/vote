import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3)
    .refine((v) => !v.includes(" "), {
      message: "Username cannot contain spaces",
    }),
  pin: z
    .number()
    .min(6, "Pin must be 6 characters long")
    .max(6, "Pin must be 6 characters long"),
});

export default eventHandler(async (event) => {
  const v = schema.safeParse(await readBody(event));
  if (!v.success) {
    throw createError({
      status: 400,
      message: "Invalid request body",
    });
  }
  const body = v.data;
  const dragonfly = event.context.redis;

  try {
    const data = (await dragonfly.json.get(
      getPinKey(body.username)
    )) as PinEntry;

    return { res: data?.pin === body.pin.toString() };
  } catch (err) {
    console.log(body, "pin validate error\n", err);
  }

  return { res: false };
});

