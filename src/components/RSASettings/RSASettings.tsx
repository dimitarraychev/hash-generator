import type { RSASettingsModel } from "../../models/RSA";
import CustomTextarea from "../CustomTextarea/CustomTextarea";
import Button from "../Button/Button";
import CustomRadio from "../CustomRadio/CustomRadio";

interface RSASettingsProps {
  settings: RSASettingsModel;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onGenerate: () => Promise<void>;
  onEncrypt: () => Promise<void>;
  onDecrypt: () => Promise<void>;
}

const RSASettings = ({
  settings,
  handleChange,
  onGenerate,
}: RSASettingsProps) => {
  return (
    <div className="settings rsa-settings">
      <CustomRadio
        name="mode"
        label="Mode:"
        value={settings.mode}
        options={[
          { label: "Decode", value: "decode" },
          { label: "Encode", value: "encode" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "mode", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <CustomRadio
        name="inputEncoding"
        label="Input Encoding:"
        value={settings.inputEncoding}
        options={[
          { label: "UTF-8", value: "utf8" },
          { label: "Hex", value: "hex" },
          { label: "Base64", value: "base64" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "inputEncoding", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <CustomRadio
        name="outputEncoding"
        label="Output Encoding:"
        value={settings.outputEncoding}
        options={[
          { label: "UTF-8", value: "utf8" },
          { label: "Hex↓", value: "hex-lower" },
          { label: "Hex↑", value: "hex-upper" },
          { label: "Base64", value: "base64" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "outputEncoding", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <CustomRadio
        name="algorithm"
        label="Algorithm:"
        value={settings.algorithm}
        options={[
          { label: "PCKS#1", value: "PCKS#1" },
          { label: "SHA-1", value: "SHA-1" },
          { label: "SHA-224", value: "SHA-224" },
          { label: "SHA-256", value: "SHA-256" },
          { label: "SHA-384", value: "SHA-384" },
          { label: "SHA-512", value: "SHA-512" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "algorithm", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <CustomTextarea
        title="Public Key"
        name="publicKey"
        id="publicKey"
        showCopy
        value={settings.publicKey}
        onChange={handleChange}
        minHeight={128}
        placeholder="Enter your public key here.."
      />

      <CustomTextarea
        title="Private Key"
        name="privateKey"
        id="privateKey"
        showCopy
        value={settings.privateKey}
        onChange={handleChange}
        minHeight={128}
        placeholder="Enter your private key here..."
      />

      <Button title="Generate Keys" text="Generate Keys" onClick={onGenerate} />
    </div>
  );
};

export default RSASettings;
