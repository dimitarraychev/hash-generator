import "./Sha256.css";

import { generateSHA256 } from "../../utils/generateSHA256";

import SettingsWrapper from "../SettingsWrapper/SettingsWrapper";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useHash } from "../../hooks/UseHash";
import type { Settings } from "../../models/Settings";

const Sha256 = () => {
  const initialSettings: Settings = {
    input: "",
    output: "",
    inputEncoding: "",
    outputEncoding: "",
    keyEncoding: "",
    key: "",
  };

  const { settingsData, handleChange } = useHash(
    generateSHA256,
    initialSettings
  );

  return (
    <section className="sha256">
      <SettingsWrapper
        settingsData={settingsData}
        handleChange={handleChange}
      />

      <ContentWrapper settingsData={settingsData} handleChange={handleChange} />
    </section>
  );
};

export default Sha256;
