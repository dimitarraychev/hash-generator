export const generateSha256 = async (
  payload: string,
  key?: string
): Promise<ArrayBuffer> => {
  const enc = new TextEncoder();
  const data = enc.encode(payload);

  if (key) {
    // HMAC-SHA256
    const keyData = enc.encode(key);
    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );
    return await window.crypto.subtle.sign("HMAC", cryptoKey, data);
  }

  // Plain SHA-256
  return await window.crypto.subtle.digest("SHA-256", data);
};
