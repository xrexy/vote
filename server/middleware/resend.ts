import { Resend } from "resend";

const config = useRuntimeConfig()
const resend = new Resend(config.resend.apiKey);

export default defineEventHandler(async (event) => {
  event.context.resend = resend;
})
