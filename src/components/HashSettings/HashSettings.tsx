import type { HashSettingsModel } from "../../models/Hash";
import AutoExpandingTextarea from "../AutoExpandingTextarea/AutoExpandingTextarea";
import CustomRadio from "../CustomRadio/CustomRadio";

interface HashSettingsProps {
  settings: HashSettingsModel;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const HashSettings = ({ settings, handleChange }: HashSettingsProps) => {
  return (
    <div className="settings">
      <CustomRadio
        name="inputEncoding"
        label="Input Encoding:"
        value={settings.inputEncoding}
        options={[
          { label: "UTF-8", value: "utf8" },
          { label: "Hex", value: "hex" },
          { label: "Base64", value: "base64" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "inputEncoding", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <CustomRadio
        name="outputEncoding"
        label="Output Encoding:"
        value={settings.outputEncoding}
        options={[
          { label: "Hex↓", value: "hex-lower" },
          { label: "Hex↑", value: "hex-upper" },
          { label: "Base64", value: "base64" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "outputEncoding", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <CustomRadio
        name="keyEncoding"
        label="Key Encoding:"
        value={settings.keyEncoding}
        options={[
          { label: "UTF-8", value: "utf8" },
          { label: "Hex", value: "hex" },
          { label: "Base64", value: "base64" },
        ]}
        onChange={(value) =>
          handleChange({
            target: { name: "keyEncoding", value },
          } as React.ChangeEvent<HTMLInputElement>)
        }
      />

      <AutoExpandingTextarea
        title="Key"
        name="key"
        id="key"
        showCopy
        value={settings.key}
        onChange={handleChange}
        minHeight={128}
        maxHeight={128}
        placeholder="Enter your key here.."
      />
    </div>
  );
};

export default HashSettings;
