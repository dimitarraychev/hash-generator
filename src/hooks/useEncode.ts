import { useState, useEffect } from "react";

export type EncodeInputType = "utf8" | "text"; // input is always text
export type EncodeOutputType = "utf8" | "hex" | "base64";

export interface EncodeSettings {
  input: string;
  output: string;
  outputEncoding: EncodeOutputType;
}

export const useEncode = (initialSettings: EncodeSettings) => {
  const [settingsData, setSettingsData] = useState<EncodeSettings>(initialSettings);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSettingsData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    try {
      const encoder = new TextEncoder();
      const bytes = encoder.encode(settingsData.input);

      let encoded: string;
      switch (settingsData.outputEncoding) {
        case "hex":
          encoded = Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          break;

        case "base64":
          encoded = btoa(String.fromCharCode(...bytes));
          break;

        case "utf8":
        default:
          encoded = settingsData.input;
          break;
      }

      setSettingsData((prev) => ({ ...prev, output: encoded }));
    } catch (err: any) {
      setSettingsData((prev) => ({ ...prev, output: `Error: ${err.message}` }));
    }
  }, [settingsData.input, settingsData.outputEncoding]);

  return { settingsData, handleChange };
};
