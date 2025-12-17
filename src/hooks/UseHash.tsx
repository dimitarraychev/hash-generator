import { useState, useEffect } from "react";
import type { Settings } from "../models/Settings";
import { encodeHash } from "../utils/encodeHash";

type HashFunction = (input: string, key?: string) => Promise<Uint8Array>;

export const useHash = (hashFn: HashFunction, initialSettings: Settings) => {
  const [settingsData, setSettingsData] = useState<Settings>(initialSettings);

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

      try {
        const rawHash = await hashFn(
          settingsData.input,
          settingsData.key || undefined
        );
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
    settingsData.outputEncoding,
    hashFn,
  ]);

  return { settingsData, handleChange, setSettingsData };
};
