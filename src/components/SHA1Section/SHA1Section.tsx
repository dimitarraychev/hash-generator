import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { generateSHA1 } from "../../utils/generateSHA1";
import { useHash } from "../../hooks/UseHash";
import type { Settings } from "../../models/Settings";

const SHA1Section = () => {
  const initialSettings: Settings = {
    input: "",
    output: "",
    inputEncoding: "utf8",
    outputEncoding: "hex-lower",
    keyEncoding: "utf8",
    key: "",
  };

  const { settingsData, handleChange } = useHash(generateSHA1, initialSettings);

  return (
    <section className="sha1 sha-section">
      <h2 className="sha-header">SHA1</h2>

      <div className="sha-columns">
        <SettingsWrapper
          settingsData={settingsData}
          handleChange={handleChange}
        />

        <ContentWrapper
          settingsData={settingsData}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default SHA1Section;
