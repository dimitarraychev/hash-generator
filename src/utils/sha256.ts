export const generateHmacSha256HexEncoded = async (
  payload: string,
  PSK: string
) => {
  const enc = new TextEncoder();
  const keyData = enc.encode(PSK);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const inputData = enc.encode(payload);
  const signature = await window.crypto.subtle.sign(
    "HMAC",
    cryptoKey,
    inputData
  );

  const hashArray = Array.from(new Uint8Array(signature));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hex;
};
