import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { generateSHA1 } from "../../utils/generateSHA1";
import { useHash } from "../../hooks/useHash";
import type { HashingSettings } from "../../models/HashingSettings";

const SHA1Section = () => {
  const initialSettings: HashingSettings = {
    input: "",
    output: "",
    inputEncoding: "utf8",
    outputEncoding: "hex-lower",
    keyEncoding: "utf8",
    key: "",
  };

  const { settingsData, handleChange } = useHash(generateSHA1, initialSettings);

  return (
    <section className="sha1 section">
      <h2 className="section-header">SHA1</h2>

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

export default SHA1Section;
