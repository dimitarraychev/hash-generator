import { useState, useEffect } from "react";
import type { HashingSettings } from "../models/HashingSettings";
import { encodeHash } from "../utils/encodeHash";
import { decodeInput } from "../utils/decodeInput";
import { validateInput } from "../utils/validateInput";

export type HashFunction = (
  input: Uint8Array,
  key?: Uint8Array
) => Promise<Uint8Array>;

export const useHash = (
  hashFn: HashFunction,
  initialSettings: HashingSettings
) => {
  const [settingsData, setSettingsData] =
    useState<HashingSettings>(initialSettings);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setSettingsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const computeHash = async () => {
      if (!settingsData.input) {
        setSettingsData((prev) => ({ ...prev, output: "" }));
        return;
      }

      if (!validateInput(settingsData.input, settingsData.inputEncoding)) {
        setSettingsData((prev) => ({
          ...prev,
          output: `Error: input is not a valid ${settingsData.inputEncoding} string`,
        }));
        return;
      }

      try {
        const inputBytes = decodeInput(
          settingsData.input,
          settingsData.inputEncoding
        );
        const keyBytes = settingsData.key
          ? decodeInput(settingsData.key, settingsData.keyEncoding)
          : undefined;

        const rawHash = await hashFn(inputBytes, keyBytes);

        const encodedHash = settingsData.outputEncoding
          ? encodeHash(rawHash.slice().buffer, settingsData.outputEncoding)
          : encodeHash(rawHash.slice().buffer, "hex-lower");

        setSettingsData((prev) => ({ ...prev, output: encodedHash }));
      } catch (err) {
        console.error(err);
        setSettingsData((prev) => ({
          ...prev,
          output: "Error computing hash",
        }));
      }
    };

    computeHash();
  }, [
    settingsData.input,
    settingsData.key,
    settingsData.inputEncoding,
    settingsData.keyEncoding,
    settingsData.outputEncoding,
    hashFn,
  ]);

  return { settingsData, handleChange, setSettingsData };
};
