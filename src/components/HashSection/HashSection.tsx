import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useHasher } from "../../hooks/useHasher";
import type { HashAlgorithm, HashingSettings } from "../../models/Hasher";

interface HashSectionProps {
  algorithm: HashAlgorithm;
  title?: string;
}

const HashSection = ({ algorithm, title }: HashSectionProps) => {
  const initialSettings: HashingSettings = {
    input: "",
    output: "",
    inputEncoding: "utf8",
    outputEncoding: "hex-lower",
    keyEncoding: "utf8",
    algorithm,
    key: "",
  };

  const { settingsData, handleChange } = useHasher(initialSettings);

  return (
    <section className={`hash-section section ${algorithm.toLowerCase()}`}>
      <h2 className="section-header">{title || `Hash ${algorithm}`}</h2>

      <div className="section-columns">
        <SettingsWrapper
          settingsData={settingsData}
          handleChange={handleChange}
        />
        <ContentWrapper
          input={settingsData.input}
          output={settingsData.output}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default HashSection;
