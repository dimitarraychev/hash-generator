import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { generateSHA256 } from "../../utils/generateSHA256";
import { useHash } from "../../hooks/UseHash";
import type { Settings } from "../../models/Settings";

const SHA256Section = () => {
  const initialSettings: Settings = {
    input: "",
    output: "",
    inputEncoding: "utf8",
    outputEncoding: "hex-lower",
    keyEncoding: "utf8",
    key: "",
  };

  const { settingsData, handleChange } = useHash(
    generateSHA256,
    initialSettings
  );

  return (
    <section className="sha256 sha-section">
      <h2 className="sha-header">SHA256</h2>

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

export default SHA256Section;
