import { useState } from "react";
import type { RSASettingsModel } from "../models/RSA";
import {
  generateKeyPair,
  encryptWithPublicKey,
  decryptWithPrivateKey,
} from "../utils/rsa";

export const useRSA = (initialSettings: RSASettingsModel) => {
  const [settings, setSettings] = useState<RSASettingsModel>(initialSettings);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target as HTMLInputElement;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async () => {
    try {
      const { publicKeyPem, privateKeyPem } = await generateKeyPair(
        settings.hash
      );
      setSettings((prev) => ({
        ...prev,
        publicKey: publicKeyPem,
        privateKey: privateKeyPem,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEncrypt = async () => {
    try {
      if (!settings.publicKey) return;
      const cipher = await encryptWithPublicKey(
        settings.publicKey,
        settings.input,
        settings.inputEncoding || "utf8",
        settings.hash
      );
      setSettings((prev) => ({ ...prev, output: cipher }));
    } catch (err) {
      console.error(err);
      setSettings((prev) => ({ ...prev, output: "Error encrypting" }));
    }
  };

  const handleDecrypt = async () => {
    try {
      if (!settings.privateKey) return;
      const plain = await decryptWithPrivateKey(
        settings.privateKey,
        settings.input,
        settings.outputEncoding || "base64",
        settings.hash
      );
      setSettings((prev) => ({ ...prev, output: plain }));
    } catch (err) {
      console.error(err);
      setSettings((prev) => ({ ...prev, output: "Error decrypting" }));
    }
  };

  return {
    settings,
    handleChange,
    handleGenerate,
    handleEncrypt,
    handleDecrypt,
    setSettings,
  };
};
