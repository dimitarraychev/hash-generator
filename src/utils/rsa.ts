/* Browser WebCrypto helpers for RSA-OAEP key generation, import/export, encrypt/decrypt */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const arrayBufferToBase64 = (buf: ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(buf);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
};

const base64ToArrayBuffer = (b64: string) => {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

const arrayBufferToHex = (buf: ArrayBuffer, upper = false) => {
  const bytes = new Uint8Array(buf);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return upper ? hex.toUpperCase() : hex;
};

const hexToArrayBuffer = (hex: string) => {
  const cleaned = hex.replace(/\s+/g, "").replace(/^0x/, "");
  const len = cleaned.length / 2;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = parseInt(cleaned.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
};

const wrapPem = (base64: string, type: "PUBLIC KEY" | "PRIVATE KEY") => {
  const lines = base64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${type}-----\n${lines.join("\n")}\n-----END ${type}-----`;
};

const unwrapPem = (pem: string) => {
  return pem.replace(/-----(BEGIN|END) [A-Z ]+-----/g, "").replace(/\s+/g, "");
};

export const generateKeyPair = async (hash: string = "SHA-256") => {
  const keys = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: hash },
    },
    true,
    ["encrypt", "decrypt"]
  );

  const pub = await crypto.subtle.exportKey("spki", keys.publicKey);
  const priv = await crypto.subtle.exportKey("pkcs8", keys.privateKey);

  const pubPem = wrapPem(arrayBufferToBase64(pub), "PUBLIC KEY");
  const privPem = wrapPem(arrayBufferToBase64(priv), "PRIVATE KEY");

  return { publicKeyPem: pubPem, privateKeyPem: privPem };
};

export const importPublicKey = async (
  pem: string,
  hash: string = "SHA-256"
) => {
  const b64 = unwrapPem(pem);
  const der = base64ToArrayBuffer(b64);
  return crypto.subtle.importKey(
    "spki",
    der,
    { name: "RSA-OAEP", hash: { name: hash } },
    true,
    ["encrypt"]
  );
};

export const importPrivateKey = async (
  pem: string,
  hash: string = "SHA-256"
) => {
  const b64 = unwrapPem(pem);
  const der = base64ToArrayBuffer(b64);
  return crypto.subtle.importKey(
    "pkcs8",
    der,
    { name: "RSA-OAEP", hash: { name: hash } },
    true,
    ["decrypt"]
  );
};

export const encryptWithPublicKey = async (
  publicKeyPem: string,
  data: string,
  encoding: string = "utf8",
  hash: string = "SHA-256"
) => {
  const pubKey = await importPublicKey(publicKeyPem, hash);
  let dataBytes: Uint8Array;
  if (encoding === "utf8" || !encoding) {
    dataBytes = encoder.encode(data);
  } else if (encoding === "base64") {
    dataBytes = new Uint8Array(base64ToArrayBuffer(data));
  } else if (encoding === "hex" || encoding === "hex-lower" || encoding === "hex-upper") {
    dataBytes = new Uint8Array(hexToArrayBuffer(data));
  } else {
    // default to utf8
    dataBytes = encoder.encode(data);
  }
  const cipher = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    pubKey,
    dataBytes as unknown as BufferSource
  );
  return arrayBufferToBase64(cipher);
};

export const decryptWithPrivateKey = async (
  privateKeyPem: string,
  b64Cipher: string,
  encoding: string = "utf8",
  hash: string = "SHA-256"
) => {
  const privKey = await importPrivateKey(privateKeyPem, hash);
  const cipher = base64ToArrayBuffer(b64Cipher);
  const plain = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privKey,
    cipher
  );
  if (encoding === "utf8" || !encoding) {
    return decoder.decode(plain);
  }

  if (encoding === "base64") {
    return arrayBufferToBase64(plain);
  }

  if (encoding === "hex-lower" || encoding === "hex-upper" || encoding === "hex") {
    const upper = encoding === "hex-upper";
    return arrayBufferToHex(plain, upper);
  }

  // fallback to utf8
  return decoder.decode(plain);
};
