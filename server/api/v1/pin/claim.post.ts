import { eq } from "drizzle-orm";
import { z } from "zod";

const schema = z.object({
  pin: z.string().length(6, "Pin must be 6 characters long"),
});

export default eventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({
      statusCode: 401,
    })
  }

  if (user.uuid) {
    throw createError({
      statusCode: 401,
      message: "Already Linked"
    })
  }

  const v = schema.safeParse(await readBody(event));
  if (!v.success) {
    throw createError({
      status: 400,
      message: v.error.issues[0].message,
    });
  }

  const pv = await pinIsValid(v.data.pin, user.username, event.context.redis)

  if (!pv.valid) {
    throw createError({
      status: 400,
      message: "Invalid PIN"
    })
  }

  try {
    const res = await db.update(userTable).set({
      uuid: pv.data.uuid,
    }).where(eq(userTable.id, user.id))

    if (res.rowCount === 0) throw new Error('nothing changed');

    return { uuid: pv.data.uuid, username: user.username }
  } catch (e) {
    console.log('error while claiming for ', user)
    console.error(e);

    throw createError({ statusCode: 500 })
  }
})
