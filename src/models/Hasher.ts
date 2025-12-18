export interface HashingSettings {
  input: string;
  output: string;
  inputEncoding: "utf8" | "hex" | "base64" | "";
  outputEncoding: "hex-lower" | "hex-upper" | "base64" | "";
  keyEncoding: "utf8" | "hex" | "base64" | "";
  algorithm: HashAlgorithm;
  key: string;
}

export type HashAlgorithm = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";
