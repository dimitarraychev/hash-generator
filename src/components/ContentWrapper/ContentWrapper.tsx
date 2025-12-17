import type { Settings } from "../../models/Settings";
import "./ContentWrapper.css";

interface ContentWrapperProps {
  settingsData: Settings;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ContentWrapper = ({
  settingsData,
  handleChange,
}: ContentWrapperProps) => {
  return (
    <div className="content">
      <label htmlFor="input">Input:</label>
      <textarea
        name="input"
        id="input"
        value={settingsData.input}
        onChange={handleChange}
      />

      <label htmlFor="output">Output:</label>
      <textarea
        readOnly
        name="output"
        id="output"
        value={settingsData.output}
        onChange={handleChange}
      />
    </div>
  );
};

export default ContentWrapper;
