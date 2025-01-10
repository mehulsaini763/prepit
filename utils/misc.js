"use server";

import { cookies } from "next/headers";
import crypto from "crypto";
import { SignJWT, jwtVerify } from "jose";

const key = new TextEncoder().encode(process.env.SECRET_KEY);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresIn)
    .sign(key);
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    await deleteCookie("[PI USER]");
  }
}

export const getCookie = async (name) => {
  if (name) {
    const session = cookies().get(name)?.value;
    if (!session) return null;
    return await decrypt(session);
  } else {
    console.log("Invalid Cookie Name");
    return false;
  }
};

export const setCookie = async (name, data) => {
  if (name && data) {
    const value = await encrypt(data);
    cookies().set(name, value, { httpOnly: true });
    return true;
  } else {
    console.log("Invalid Cookie Arguments");
    return false;
  }
};

export const deleteCookie = async (name) => {
  if (name) {
    cookies().delete(name);
    return true;
  } else {
    console.log("Invalid Cookie Name");
    return false;
  }
};

export const decryptData = (request) => {
  const { data, iv, tag } = request;

  const key = crypto
    .createHash("sha256")
    .update(process.env.SECRET_KEY)
    .digest(); // Ensure 32 bytes
  const algorithm = "aes-256-gcm";

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );
  decipher.setAuthTag(Buffer.from(tag, "hex"));

  try {
    let decryptedData = decipher.update(data, "hex", "utf8");
    decryptedData += decipher.final("utf8");
    return JSON.parse(decryptedData);
  } catch (error) {
    throw new Error("Invalid decryption data or key");
  }
};

export const encryptData = async (request) => {
  const key = crypto
    .createHash("sha256")
    .update(process.env.SECRET_KEY)
    .digest(); // Ensure 32 bytes
  const algorithm = "aes-256-gcm";

  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(JSON.stringify(request), "utf8", "hex");
  encryptedData += cipher.final("hex");

  const tag = cipher.getAuthTag().toString("hex");

  return {
    data: encryptedData,
    iv: iv.toString("hex"),
    tag: tag,
  };
};
