import type { HashAlgorithm } from "../models/Hasher";

export const generateHash = async (
  payload: Uint8Array,
  algorithm: HashAlgorithm,
  key?: Uint8Array
): Promise<Uint8Array> => {
  if (key) {
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new Uint8Array(key).buffer,
      { name: "HMAC", hash: algorithm },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      new Uint8Array(payload).buffer
    );
    return new Uint8Array(signature);
  }

  const digest = await crypto.subtle.digest(
    algorithm,
    new Uint8Array(payload).buffer
  );
  return new Uint8Array(digest);
};
