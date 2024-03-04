import { generateId } from "lucia";

import { RedisClient } from "../plugins/redis";
import { Resend } from "resend";
import { Type } from "@upstash/redis";

export const VERIFICATION_CODE_EXPIRATION = 60 * 60 * 24  // 1 day

export const generateVerificationCode = () => generateId(6)

export const getVerificationKey = (id: string) => `server:verification:${id}`

export const getVerificationCode = (redis: RedisClient, id: string) => {
  const key = getVerificationKey(id)
  return redis.get<string>(key)
}

export const createAndSetVerificationCode = async (redis: RedisClient, id: string): Promise<
  | { success: true, code: string, key: string }
  | { success: false, error: unknown }
> => {
  const code = generateVerificationCode()
  const key = getVerificationKey(id)

  try {
    await redis.set(key, code)
    await redis.expire(key, VERIFICATION_CODE_EXPIRATION)
    return { success: true, code, key }
  } catch (e) {
    return { success: false, error: e }
  }
}


type EmailType = 'regenerate' | 'new'
interface TypePayload {
  'regenerate': {},
  'new': { serverTitle: string }
}

function makeSubject<T extends EmailType>(type: T, payload: TypePayload[T]) {
  switch (type) {
    case 'new':
      // @ts-ignore ts is dying for some reason
      return `[${payload.serverTitle}] Server verification code`
    case 'regenerate':
      return `Server verification code regenerated`
    default:
      throw new Error('Invalid email type')
  }
}

export const sendVerificationEmail = async <ET extends EmailType>(
  resend: Resend,
  email: string,
  code: string,
  type: ET,
  payload: TypePayload[ET]
): Promise<
  | { success: true }
  | { success: false, error: unknown }
> => {
  try {
    await resend.emails.send({
      from: "Craftex <system@craftex.dev>",
      to: email,
      subject: makeSubject(type, payload),
      html: '<h1>Server Verification</h1><p>Your verification code is: <strong>' + code + '</strong>. Expires in one day.</p>',
    })

    return { success: true }
  } catch (e) {
    return { success: false, error: e }
  }

}
