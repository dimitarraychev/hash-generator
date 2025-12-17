import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useEncode } from "../../hooks/useEncode";
import type { EncodeSettings } from "../../hooks/useEncode";

const EncodeSection = () => {
  const initialSettings: EncodeSettings = {
    input: "",
    output: "",
    outputEncoding: "utf8",
  };

  const { settingsData, handleChange } = useEncode(initialSettings);

  return (
    <section className="encode-section sha-section">
      <h2 className="sha-header">Encode</h2>

      <div className="sha-columns">
        <div className="settings">
          <label htmlFor="outputEncoding">Output Encoding:</label>
          <select
            name="outputEncoding"
            value={settingsData.outputEncoding}
            onChange={handleChange}
          >
            <option value="utf8">UTF-8</option>
            <option value="hex">Hex</option>
            <option value="base64">Base64</option>
          </select>
        </div>

        <ContentWrapper
          input={settingsData.input}
          output={settingsData.output}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default EncodeSection;
