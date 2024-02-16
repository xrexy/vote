import { generateRandomInteger } from "oslo/crypto";
import { RedisClient } from "../plugins/redis";

export type PinEntry = {
  pin: string;
  uuid: string;
};

export const PIN_LENGHT = 6;

export const getPinKey = (username: string) =>
  `pin:${Buffer.from(username.trim()).toString("base64")}`;

export const generatePin = () =>
  Array(PIN_LENGHT)
    .fill(0)
    .map(() => 1 + generateRandomInteger(9))
    .join("");


export async function pinIsValid(pin: string, username: string, dragonfly: RedisClient): Promise<{ valid: true, data: PinEntry } | { valid: false }> {
  try {
    // NOTE: no need to delete after since you cannot access this after you've linked your account
    const data = (await dragonfly.json.get(getPinKey(username))) as PinEntry;

    const valid = data?.pin === pin.toString()
    if (!valid) return { valid: false }

    return { valid: true, data };
  } catch (err) {
    console.log("pin validate error\n", pin, username);
    console.error(err)
  }

  return { valid: false };
}
