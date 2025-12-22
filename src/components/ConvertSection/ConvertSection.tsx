import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useConvert } from "../../hooks/useConvert";
import type { ConvertSettingsModel } from "../../models/Convert";

interface ConvertSectionProps {
  title: string;
  convertFn: (input: string, mode: "encode" | "decode") => string;
}

const ConvertSection = ({ title, convertFn }: ConvertSectionProps) => {
  const initialSettings: ConvertSettingsModel = {
    input: "",
    output: "",
    mode: "decode",
  };

  const { settings, handleChange } = useConvert(initialSettings, convertFn);

  return (
    <section className="converter-section section">
      <h2 className="section-header">{title}</h2>
      <div className="section-columns">
        <div className="settings">
          <label htmlFor="mode">Mode:</label>
          <select name="mode" value={settings.mode} onChange={handleChange}>
            <option value="decode">Decode</option>
            <option value="encode">Encode</option>
          </select>
        </div>

        <ContentWrapper
          input={settings.input}
          output={settings.output}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default ConvertSection;
