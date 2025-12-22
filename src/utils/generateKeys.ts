import type { GenerateFn } from "../models/Generate";

export const generateKeys: GenerateFn = ({
  count,
  length,
  excludeAmbiguous,
}) => {
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789";

  if (excludeAmbiguous) {
    chars = chars.replace(/[0O1lI]/g, "");
  }

  const passwords: string[] = [];
  const charLen = chars.length;

  for (let i = 0; i < count; i++) {
    let pw = "";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let j = 0; j < length; j++) {
      pw += chars[randomValues[j] % charLen];
    }

    passwords.push(pw);
  }

  return passwords;
};
