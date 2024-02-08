import z from "zod";

const ipv4Schema = z.string().ip({ version: "v4" });
const urlSchema = z.string().url();

const schema = z.object({
  title: z.string().min(8).max(64),
  ip: z.union([ipv4Schema, urlSchema]),
});

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const v = schema.safeParse(JSON.parse(body));
  if (!v.success) throw createError({ statusCode: 400 })
});
