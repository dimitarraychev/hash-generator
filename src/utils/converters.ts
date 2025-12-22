import type { ConvertMode } from "../models/Convert";
import { decodeInput, encodeOutput, isValidEncoding } from "./encoding";

const hexToBytesOnline = (hex: string): Uint8Array => {
  let cleaned = hex.replace(/\s+/g, "").replace(/^0x/, "");
  if (cleaned.length % 2 === 1) cleaned = "0" + cleaned;
  const bytes = cleaned.match(/.{2}/g)?.map((b) => parseInt(b, 16)) ?? [];
  return new Uint8Array(bytes);
};

export const hexConverter = (input: string, mode: ConvertMode): string => {
  if (mode === "decode" && !isValidEncoding(input, "hex"))
    throw new Error("Invalid hex string");

  if (mode === "encode") {
    const bytes = decodeInput(input, "utf8");
    return encodeOutput(bytes.buffer as ArrayBuffer, "hex");
  } else {
    const bytes = hexToBytesOnline(input);
    return encodeOutput(bytes.buffer as ArrayBuffer, "utf8");
  }
};

export const base64Converter = (input: string, mode: ConvertMode): string => {
  if (!isValidEncoding(input, "base64"))
    throw new Error("Invalid Base64 string");

  if (mode === "encode") {
    const bytes = decodeInput(input, "utf8");
    return encodeOutput(bytes.buffer as ArrayBuffer, "base64");
  } else {
    const bytes = decodeInput(input, "base64");
    return encodeOutput(bytes.buffer as ArrayBuffer, "utf8");
  }
};

export const urlConverter = (input: string, mode: ConvertMode): string => {
  try {
    return mode === "encode"
      ? encodeURIComponent(input)
      : decodeURIComponent(input);
  } catch {
    throw new Error("Invalid URL encoded string");
  }
};
