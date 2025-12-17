import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useDecode } from "../../hooks/useDecode";
import type { EncodingSettings } from "../../models/EncodingSettings";

const DecodeSection = () => {
  const initialSettings: EncodingSettings = {
    input: "",
    output: "",
    inputEncoding: "utf8",
  };

  const { settingsData, handleChange } = useDecode(initialSettings);

  return (
    <section className="base64 sha-section">
      <h2 className="sha-header">Decode</h2>

      <div className="sha-columns">
        <div className="settings">
          <label htmlFor="inputEncoding">Input Encoding:</label>
          <select
            name="inputEncoding"
            value={settingsData.inputEncoding}
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

export default DecodeSection;
