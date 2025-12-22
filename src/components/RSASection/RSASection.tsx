import RSASettings from "../RSASettings/RSASettings";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import { useRSA } from "../../hooks/useRSA";
import type { RSASettingsModel } from "../../models/RSA";

const RSASection = () => {
  const initialSettings: RSASettingsModel = {
    input: "",
    output: "",
    inputEncoding: "utf8",
    outputEncoding: "base64",
    publicKey: "",
    privateKey: "",
    algorithm: "RSA-OAEP",
    hash: "SHA-256",
  };

  const {
    settings,
    handleChange,
    handleGenerate,
    handleEncrypt,
    handleDecrypt,
  } = useRSA(initialSettings);

  return (
    <section className={`rsa-section section`}>
      <h2 className="section-header">Crypto RSA</h2>

      <div className="section-columns">
        <RSASettings
          settings={settings}
          handleChange={handleChange}
          onGenerate={handleGenerate}
          onEncrypt={handleEncrypt}
          onDecrypt={handleDecrypt}
        />

        <ContentWrapper
          input={settings.input}
          output={settings.output}
          handleChange={handleChange}
        />
      </div>
    </section>
  );
};

export default RSASection;
