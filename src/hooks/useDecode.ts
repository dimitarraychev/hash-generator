import { useState, useEffect } from "react";
import type { EncodingSettings } from "../models/EncodingSettings";

export const useDecode = (initialSettings: EncodingSettings) => {
  const [settingsData, setSettingsData] =
    useState<EncodingSettings>(initialSettings);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setSettingsData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    try {
      let decoded: string;

      switch (settingsData.inputEncoding) {
        case "hex":
          if (!/^[0-9a-fA-F]*$/.test(settingsData.input)) {
            throw new Error("Input is not a valid hex string");
          }
          const bytes =
            settingsData.input.match(/.{1,2}/g)?.map((b) => parseInt(b, 16)) ||
            [];
          decoded = new TextDecoder().decode(new Uint8Array(bytes));
          break;

        case "base64":
          try {
            decoded = atob(settingsData.input);
          } catch {
            throw new Error("Input is not a valid Base64 string");
          }
          break;

        case "utf8":
        default:
          decoded = settingsData.input;
          break;
      }

      setSettingsData((prev) => ({ ...prev, output: decoded }));
    } catch (err: any) {
      setSettingsData((prev) => ({ ...prev, output: `Error: ${err.message}` }));
    }
  }, [settingsData.input, settingsData.inputEncoding]);

  return { settingsData, handleChange };
};
