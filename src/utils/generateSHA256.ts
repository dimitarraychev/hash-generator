export const generateSHA256 = async (
  payload: string,
  key?: string
): Promise<Uint8Array> => {
  // <-- return Uint8Array now
  const enc = new TextEncoder();
  const data = enc.encode(payload);

  let buffer: ArrayBuffer;

  if (key) {
    const keyData = enc.encode(key);
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    buffer = await window.crypto.subtle.sign("HMAC", cryptoKey, data);
  } else {
    // Plain SHA-256
    buffer = await window.crypto.subtle.digest("SHA-256", data);
  }

  return new Uint8Array(buffer); // <-- wrap ArrayBuffer in Uint8Array
};
