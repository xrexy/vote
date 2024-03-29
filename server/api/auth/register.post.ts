import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

// import { DrizzleError } from "drizzle-orm/";

import z from "zod";

const signupSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(255),
});

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const v = signupSchema.safeParse(body);
  if (!v.success) {
    throw createError({
      message: v.error.issues[0].message,
      statusCode: 400,
    });
  }

  const { password, username } = v.data;
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);
  try {
    await db.insert(userTable).values({
      id: userId,
      password: hashedPassword,
      username,
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    );
  } catch (e: any) {
    if (e.constraint === "user_username_unique") {
      throw createError({
        message: "Username is already taken",
        statusCode: 400,
      });
    }

    console.log(e);
    throw createError({ message: "Internal Server Error", statusCode: 500 });
  }
});

