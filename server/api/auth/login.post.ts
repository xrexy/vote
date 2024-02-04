// server/api/login.post.ts
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

  const existingUser = await db.query.user.findFirst({
    where: (u, {eq}) => eq(u.username, username.toLowerCase()),
  })
	if (!existingUser) {
		// TODO: NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is none-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
		// If usernames are public, you may outright tell the user that the username is invalid.
		throw createError({
			message: "Incorrect username or password",
			statusCode: 400
		});
	}

	const validPassword = await new Argon2id().verify(existingUser.password, password);
	if (!validPassword) {
		throw createError({
			message: "Incorrect username or password",
			statusCode: 400
		});
	}

	const session = await lucia.createSession(existingUser.id, {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
});
