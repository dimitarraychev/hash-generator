import forge from "node-forge";
import type { Encoding } from "../models/Convert";
import type { RSAAlgorithm } from "../models/RSA";
import {
  decodeInput,
  encodeOutput,
  bytesToBase64,
  base64ToBytes,
} from "./encoding";

const wrapPem = (
  base64: string,
  type: "PUBLIC KEY" | "PRIVATE KEY"
): string => {
  const lines = base64.match(/.{1,64}/g) || [];
  return `-----BEGIN ${type}-----\n${lines.join("\n")}\n-----END ${type}-----`;
};

const unwrapPem = (pem: string): string =>
  pem.replace(/-----(BEGIN|END) [A-Z ]+-----/g, "").replace(/\s+/g, "");

export const generateKeyPair = async (
  algorithm: RSAAlgorithm = "SHA-256",
  modulusLength: number = 2048
) => {
  if (algorithm === "PCKS#1") {
    const keypair = (forge as any).pki.rsa.generateKeyPair({
      bits: modulusLength,
      e: 0x10001,
    });
    const pubPem = (forge as any).pki.publicKeyToPem(keypair.publicKey);
    const privPem = (forge as any).pki.privateKeyToPem(keypair.privateKey);
    return { publicKeyPem: pubPem, privateKeyPem: privPem };
  }

  const keys = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: { name: algorithm },
    },
    true,
    ["encrypt", "decrypt"]
  );

  const pub = await crypto.subtle.exportKey("spki", keys.publicKey);
  const priv = await crypto.subtle.exportKey("pkcs8", keys.privateKey);

  const pubPem = wrapPem(bytesToBase64(pub), "PUBLIC KEY");
  const privPem = wrapPem(bytesToBase64(priv), "PRIVATE KEY");

  return { publicKeyPem: pubPem, privateKeyPem: privPem };
};

export const importPublicKey = async (
  pem: string,
  algorithm: RSAAlgorithm = "SHA-256"
) => {
  const der = base64ToBytes(unwrapPem(pem));
  if (algorithm === "PCKS#1") {
    return new Uint8Array(der);
  }

  return crypto.subtle.importKey(
    "spki",
    new Uint8Array(der),
    { name: "RSA-OAEP", hash: { name: algorithm } },
    true,
    ["encrypt"]
  );
};

export const importPrivateKey = async (
  pem: string,
  algorithm: RSAAlgorithm = "SHA-256"
) => {
  const der = base64ToBytes(unwrapPem(pem));
  if (algorithm === "PCKS#1") {
    return new Uint8Array(der);
  }

  return crypto.subtle.importKey(
    "pkcs8",
    new Uint8Array(der),
    { name: "RSA-OAEP", hash: { name: algorithm } },
    true,
    ["decrypt"]
  );
};

export const encryptWithPublicKey = async (
  publicKeyPem: string,
  data: string,
  inputEncoding: Encoding = "utf8",
  outputEncoding: Encoding = "base64",
  algorithm: RSAAlgorithm = "SHA-256"
): Promise<string> => {
  if (algorithm === "PCKS#1") {
    const pub = (forge as any).pki.publicKeyFromPem(publicKeyPem);
    const dataBytes = decodeInput(data, inputEncoding);
    const binary = String.fromCharCode(...new Uint8Array(dataBytes));
    const encrypted = pub.encrypt(binary, "RSAES-PKCS1-V1_5");
    const encryptedBytes = new Uint8Array(
      [...encrypted].map((c: string) => c.charCodeAt(0))
    );
    return encodeOutput(encryptedBytes.buffer, outputEncoding);
  }

  const pubKey = (await importPublicKey(publicKeyPem, algorithm)) as CryptoKey;
  const dataBytes = decodeInput(data, inputEncoding);

  const cipher = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    pubKey,
    new Uint8Array(dataBytes)
  );

  return encodeOutput(cipher, outputEncoding);
};

export const decryptWithPrivateKey = async (
  privateKeyPem: string,
  cipherInput: string,
  inputEncoding: Encoding = "base64",
  outputEncoding: Encoding = "utf8",
  algorithm: RSAAlgorithm = "SHA-256"
): Promise<string> => {
  if (algorithm === "PCKS#1") {
    const priv = (forge as any).pki.privateKeyFromPem(privateKeyPem);
    const cipherBytes = decodeInput(cipherInput, inputEncoding);
    const binary = String.fromCharCode(...new Uint8Array(cipherBytes));
    const decrypted = priv.decrypt(binary, "RSAES-PKCS1-V1_5");
    const decryptedBytes = new Uint8Array(
      [...decrypted].map((c: string) => c.charCodeAt(0))
    );
    return encodeOutput(decryptedBytes.buffer, outputEncoding);
  }

  const privKey = (await importPrivateKey(
    privateKeyPem,
    algorithm
  )) as CryptoKey;
  const cipherBytes = decodeInput(cipherInput, inputEncoding);

  const plain = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    privKey,
    new Uint8Array(cipherBytes)
  );

  return encodeOutput(plain, outputEncoding);
};
