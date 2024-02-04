import { generateId } from "lucia";
import { Argon2id } from "oslo/password";

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const username = body.username;
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw createError({
      message: "Invalid username",
      statusCode: 400,
    });
  }
  const password = body.password
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw createError({
      message: "Invalid password",
      statusCode: 400,
    });
  }

  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

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
});

