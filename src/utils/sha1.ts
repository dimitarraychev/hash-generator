export const generateHmacSha1Base64UrlEncoded = async (
  payload: string,
  PSK: string
) => {
  const enc = new TextEncoder();
  const keyData = enc.encode(PSK);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-1" } },
    false,
    ["sign"]
  );

  const inputData = enc.encode(payload);
  const signature = await window.crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    inputData
  );

  const base64Encoded = btoa(String.fromCharCode(...new Uint8Array(signature)));
  const urlEncoded = encodeURIComponent(base64Encoded);

  return urlEncoded;
};
