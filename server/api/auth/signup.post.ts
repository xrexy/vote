import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

import z from "zod";

const signupSchema = z.object({
  username: z.string().min(3).max(31),
  password: z.string().min(6).max(255),
  // email: z.string().email(),
});

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const v = signupSchema.safeParse(body);
  if (!v.success) throw createError({ statusCode: 400 });

  const { password, username } = v.data;
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);
  try {
    // TODO: check if username is already used
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
  } catch (e) {
    console.log(e);
  }

  console.log("registered");
});

