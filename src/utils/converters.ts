import type { ConverterMode } from "../models/ConverterMode";

export const hexConverter = (input: string, mode: ConverterMode): string => {
  if (mode === "encode") {
    return Array.from(new TextEncoder().encode(input))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } else {
    if (!/^[0-9a-fA-F]*$/.test(input)) throw new Error("Invalid hex string");
    const bytes = input.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) || [];
    return String.fromCharCode(...bytes);
  }
};

export const base64Converter = (input: string, mode: ConverterMode): string => {
  if (mode === "encode") {
    const bytes = new TextEncoder().encode(input);
    return btoa(String.fromCharCode(...bytes));
  } else {
    try {
      const bytes = Uint8Array.from(
        [...atob(input)].map((c) => c.charCodeAt(0))
      );
      return new TextDecoder().decode(bytes);
    } catch {
      throw new Error("Invalid Base64 string");
    }
  }
};

export const urlConverter = (input: string, mode: ConverterMode): string => {
  try {
    return mode === "encode"
      ? encodeURIComponent(input)
      : decodeURIComponent(input);
  } catch {
    throw new Error("Invalid URL encoded string");
  }
};
