import { toast } from "react-toastify";
import "./ContentWrapper.css";
import copySvg from "../../assets/copy.svg";

interface ContentWrapperProps {
  hasInput?: boolean;
  input: string;
  output: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ContentWrapper = ({
  hasInput = true,
  input,
  output,
  handleChange,
}: ContentWrapperProps) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Content copied to clipboard ✅");
  };

  return (
    <div className="content">
      {hasInput && (
        <div className="content-wrapper">
          <label htmlFor="input">Input:</label>
          <textarea
            name="input"
            id="input"
            value={input}
            onChange={handleChange}
          />
          <img
            src={copySvg}
            alt="Copy"
            className="copy"
            title="Copy Input"
            onClick={() => handleCopy(input)}
          />
        </div>
      )}
      <div className="content-wrapper">
        <label htmlFor="output">Output:</label>
        <textarea
          readOnly
          name="output"
          id="output"
          value={output}
          onChange={handleChange}
        />
        <img
          src={copySvg}
          alt="Copy"
          className="copy"
          title="Copy Output"
          onClick={() => handleCopy(output)}
        />
      </div>
    </div>
  );
};

export default ContentWrapper;
