import { generateRandomInteger } from "oslo/crypto";

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
