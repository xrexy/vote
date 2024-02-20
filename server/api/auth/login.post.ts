import { Argon2id } from "oslo/password";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3)
    .max(16)
    .refine((name) => !name.includes(" "), {
      message: "Username cannot contain spaces",
    }),
  password: z.string().min(6).max(255),
});

export default eventHandler(async (event) => {
  const v = schema.safeParse(await readBody(event));
  if (!v.success) {
    throw createError({
      message: v.error.issues[0].message,
      statusCode: 400,
    });
  }
  const { password, username } = v.data;

  const existingUser = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.username, username.toLowerCase()),
  });
  if (!existingUser) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  );
  if (!validPassword) {
    throw createError({
      message: "Incorrect username or password",
      statusCode: 400,
    });
  }

  const session = await lucia.createSession(existingUser.id, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize()
  );
});

