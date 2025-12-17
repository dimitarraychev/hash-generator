export interface HashingSettings {
  input: string;
  output: string;
  inputEncoding: "utf8" | "hex" | "base64" | "";
  outputEncoding: "hex-lower" | "hex-upper" | "base64" | "";
  keyEncoding: "utf8" | "hex" | "base64" | "";
  key: string;
}
