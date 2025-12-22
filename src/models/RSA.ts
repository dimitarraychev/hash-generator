import type { Encoding } from "./Convert";

export interface RSASettingsModel {
  input: string;
  output: string;
  inputEncoding: Encoding;
  outputEncoding: Encoding;
  publicKey: string;
  privateKey: string;
  algorithm: RSAAlgorithm;
}

export type RSAAlgorithm =
  | "pcks1"
  | "SHA-1"
  | "SHA-224"
  | "SHA-256"
  | "SHA-384"
  | "SHA-512";

export const RSA_ALGORITHM_LABELS: Record<RSAAlgorithm, string> = {
  pcks1: "ECB / PCKS#1",
  "SHA-1": "OAEP / SHA-1",
  "SHA-224": "OAEP / SHA-224",
  "SHA-256": "OAEP / SHA-256",
  "SHA-384": "OAEP / SHA-384",
  "SHA-512": "OAEP / SHA-512",
};
