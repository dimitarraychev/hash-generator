import type { RSASettingsModel } from "../../models/RSA";
import { RSA_ALGORITHM_LABELS } from "../../models/RSA";
import AutoExpandingTextarea from "../AutoExpandingTextarea/AutoExpandingTextarea";
import Button from "../Button/Button";

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
  onEncrypt,
  onDecrypt,
}: RSASettingsProps) => {
  return (
    <div className="settings rsa-settings">
      <label htmlFor="inputEncoding">Input Encoding:</label>
      <select
        name="inputEncoding"
        id="inputEncoding"
        value={settings.inputEncoding}
        onChange={handleChange}
      >
        <option value="utf8">UTF-8</option>
        <option value="hex">Hex</option>
        <option value="base64">Base64</option>
      </select>

      <label htmlFor="outputEncoding">Output Encoding:</label>
      <select
        name="outputEncoding"
        id="outputEncoding"
        value={settings.outputEncoding}
        onChange={handleChange}
      >
        <option value="base64">Base64</option>
        <option value="hex-lower">Hex (lowercase)</option>
        <option value="hex-upper">Hex (uppercase)</option>
      </select>

      <label htmlFor="algorithm">Algorithm:</label>
      <select
        name="algorithm"
        id="algorithm"
        value={settings.algorithm}
        onChange={handleChange}
      >
        {Object.entries(RSA_ALGORITHM_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <AutoExpandingTextarea
        title="Public Key"
        name="publicKey"
        id="publicKey"
        showCopy
        value={settings.publicKey}
        onChange={handleChange}
        minHeight={144}
        maxHeight={144}
        placeholder="Enter your public key here.."
      />

      <AutoExpandingTextarea
        title="Private Key"
        name="privateKey"
        id="privateKey"
        showCopy
        value={settings.privateKey}
        onChange={handleChange}
        minHeight={144}
        maxHeight={144}
        placeholder="Enter your private key here..."
      />

      <div className="rsa-actions">
        <Button title="Generate" text="Generate" onClick={onGenerate} />
        <Button title="Encrypt" text="Encrypt" onClick={onEncrypt} />
        <Button title="Decrypt" text="Decrypt" onClick={onDecrypt} />
      </div>
    </div>
  );
};

export default RSASettings;
