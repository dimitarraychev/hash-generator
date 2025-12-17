import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useConverter } from "../../hooks/useConverter";
import type { ConverterSettings } from "../../hooks/useConverter";

interface ConverterProps {
  title: string;
  converterFn: (input: string, mode: "encode" | "decode") => string;
}

const ConverterSection = ({ title, converterFn }: ConverterProps) => {
  const initialSettings: ConverterSettings = {
    input: "",
    output: "",
    mode: "decode",
  };

  const { settingsData, handleChange } = useConverter(
    initialSettings,
    converterFn
  );

  return (
    <section className="converter-section section">
      <h2 className="section-header">{title}</h2>
      <div className="section-columns">
        <div className="settings">
          <label htmlFor="mode">Mode:</label>
          <select name="mode" value={settingsData.mode} onChange={handleChange}>
            <option value="decode">Decode</option>
            <option value="encode">Encode</option>
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

export default ConverterSection;
