import "./SettingsWrapper.css";
import type { HashingSettings } from "../../models/HashingSettings";

interface SettingsWrapperProps {
  settingsData: HashingSettings;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const SettingsWrapper = ({
  settingsData,
  handleChange,
}: SettingsWrapperProps) => {
  return (
    <div className="settings">
      <label htmlFor="inputEncoding">Input Encoding:</label>
      <select
        name="inputEncoding"
        id="inputEncoding"
        value={settingsData.inputEncoding}
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
        value={settingsData.outputEncoding}
        onChange={handleChange}
      >
        <option value="hex-lower">Hex (lowercase)</option>
        <option value="hex-upper">Hex (uppercase)</option>
        <option value="base64">Base64</option>
      </select>

      <details className="hmac-wrapper">
        <summary>HMAC</summary>

        <div className="hmac-content">
          <label htmlFor="keyEncoding">Key Encoding:</label>
          <select
            name="keyEncoding"
            id="keyEncoding"
            value={settingsData.keyEncoding}
            onChange={handleChange}
          >
            <option value="utf8">UTF-8</option>
            <option value="hex">Hex</option>
            <option value="base64">Base64</option>
          </select>

          <label htmlFor="key">Key:</label>
          <input
            type="text"
            name="key"
            id="key"
            value={settingsData.key}
            onChange={handleChange}
          />
        </div>
      </details>
    </div>
  );
};

export default SettingsWrapper;
