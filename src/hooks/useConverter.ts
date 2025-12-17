import { useState, useEffect } from "react";
import type { ConverterMode } from "../models/ConverterMode";

export interface ConverterSettings {
  input: string;
  output: string;
  mode: ConverterMode;
}

type ConverterFunction = (input: string, mode: ConverterMode) => string;

export const useConverter = (
  initialSettings: ConverterSettings,
  converterFn: ConverterFunction
) => {
  const [settingsData, setSettingsData] =
    useState<ConverterSettings>(initialSettings);

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
      const result = converterFn(settingsData.input, settingsData.mode);
      setSettingsData((prev) => ({ ...prev, output: result }));
    } catch (err: any) {
      setSettingsData((prev) => ({ ...prev, output: `Error: ${err.message}` }));
    }
  }, [settingsData.input, settingsData.mode, converterFn]);

  return { settingsData, handleChange };
};
