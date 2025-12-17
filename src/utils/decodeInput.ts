import type { Settings } from "../models/Settings";

export const decodeInput = (value: string, encoding: Settings["inputEncoding"]) => {
  if (!encoding || encoding === "utf8") return value;

  if (encoding === "hex") {
    const bytes = new Uint8Array(
      value.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) || []
    );
    return new TextDecoder().decode(bytes);
  }

  if (encoding === "base64") {
    const binary = atob(value);
    const bytes = new Uint8Array([...binary].map((c) => c.charCodeAt(0)));
    return new TextDecoder().decode(bytes);
  }

  return value;
};