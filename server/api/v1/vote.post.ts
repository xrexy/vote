import { z } from "zod";

import { createHmac } from "crypto";
import { createConnection, type Socket } from "net";

const SERVICE_NAME = "vote-test";

const payloadSchema = z.object({
  username: z.string(),
  address: z.string(),
});

type Payload = {
  vote: {
    timestamp: number;
    serviceName: string;
    username: string;
    address: string;
  };
  host: string;
  port: number;
  token: string;
};

const HOST = "127.0.0.1";
const PORT = 8192;
const TOKEN = "gh1of7m47liqpor1g46tcg3a1d";

function createMessage(header: string, vote: Payload["vote"], token: string) {
  const data = header.split(" ");

  if (data.length !== 3) {
    throw new Error("Invalid protocol header");
  }

  (vote as any)["challenge"] = data[2].substring(0, data[2].length - 1);
  console.log("vote", vote);

  const voteJson = JSON.stringify(vote);
  const digest = createHmac("sha256", token);
  digest.update(voteJson);

  const sig = digest.digest("base64");

  const message = JSON.stringify({ payload: voteJson, signature: sig });
  const messageBuffer = Buffer.alloc(message.length + 4);
  messageBuffer.writeUInt16BE(0x733a);
  messageBuffer.writeUInt16BE(message.length, 2);
  messageBuffer.write(message, 4);
  return messageBuffer;
}

export default eventHandler(async (event) => {
  if (!event.context.user) {
    throw createError({ message: "Unauthorized", statusCode: 401 });
  }

  const body = await readBody(event);

  const v = payloadSchema.safeParse(body);
  if (!v.success) {
    throw createError({
      message: "Invalid payload",
      statusCode: 400,
    });
  }

  const payload = {
    vote: {
      ...v.data,
      timestamp: Date.now(),
      serviceName: SERVICE_NAME,
    },
    host: HOST,
    port: PORT,
    token: TOKEN,
  };

  const socket = await new Promise<Socket>((resolve, reject) => {
    const s = createConnection(payload.port, payload.host, () => {
      resolve(s);
    });

    s.on("error", (err) => {
      console.log(err);
      s.end()
      reject("Socket error");
    });

    s.setTimeout(2000, () => {
      s.end()
      reject("Socket timed out");
    });
  });

  const message = await new Promise<Buffer>((resolve, reject) => {
    socket.once("data", (headerBuffer) => {
      try {
        const header = headerBuffer.toString();
        const message = createMessage(header, payload.vote, payload.token);
        resolve(message);
      } catch (e) {
        console.log("Error creating message", e);
        reject("Couldn't create message");
      }
    });
  });

  socket.write(message);

  const response = await new Promise<Record<PropertyKey, any>>(
    (resolve, reject) => {
      socket.once("data", (respBuff) => {
        try {
          resolve(JSON.parse(respBuff.toString()));
        } catch {
          reject("Couldn't parse response");
        }
      });
    }
  );

  socket.end()

  if (response.status === "error") {
    throw createError({ message: "Couldn't send vote", statusCode: 400 });
  }

  if (response.status === "ok") {
    return {
      status: "success",
      username: payload.vote.username,
      timestamp: payload.vote.timestamp,
    };
  }

  console.log("Unhandled response", response);
  throw createError({ message: "Unhandled response", statusCode: 500 });
});

