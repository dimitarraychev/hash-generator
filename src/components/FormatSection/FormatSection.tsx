import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useFormat } from "../../hooks/useFormat";
import type { FormatSettings } from "../../models/Formatter";

const FormatSection = () => {
  const initialSettings: FormatSettings = {
    input: "",
    output: "",
    mode: "parse",
  };

  const { settings, handleChange } = useFormat(initialSettings);

  return (
    <section className="converter-section section">
      <h2 className="section-header">Format JSON</h2>
      <div className="section-columns">
        <div className="settings">
          <label htmlFor="mode">Mode:</label>
          <select name="mode" value={settings.mode} onChange={handleChange}>
            <option value="parse">Parse</option>
            <option value="stringify">Stringify</option>
            <option value="stringify-pretty">Pretty-print</option>
          </select>
        </div>

        <ContentWrapper
          hasInput={true}
          input={settings.input}
          output={settings.output}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default FormatSection;
