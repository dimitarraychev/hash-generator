import HashSettings from "../HashSettings/HashSettings";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useHash } from "../../hooks/useHash";
import type { HashAlgorithm, HashSettingsModel } from "../../models/Hash";

interface HashSectionProps {
  algorithm: HashAlgorithm;
  title?: string;
}

const HashSection = ({ algorithm, title }: HashSectionProps) => {
  const initialSettings: HashSettingsModel = {
    input: "",
    output: "",
    inputEncoding: "utf8",
    outputEncoding: "hex-lower",
    keyEncoding: "utf8",
    algorithm,
    key: "",
  };

  const { settings, handleChange } = useHash(initialSettings);

  return (
    <section className={`hash-section section ${algorithm.toLowerCase()}`}>
      <h2 className="section-header">{title || `Hash ${algorithm}`}</h2>

      <div className="section-columns">
        <HashSettings settings={settings} handleChange={handleChange} />
        <ContentWrapper
          input={settings.input}
          output={settings.output}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default HashSection;
