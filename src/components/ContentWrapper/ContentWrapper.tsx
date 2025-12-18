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
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Output copied to clipboard ✅");
  };

  return (
    <div className="content">
      {hasInput && (
        <>
          <label htmlFor="input">Input:</label>
          <textarea
            name="input"
            id="input"
            value={input}
            onChange={handleChange}
          />
        </>
      )}
      <div className="output-wrapper">
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
          title="Copy"
          onClick={handleCopy}
        />
      </div>
    </div>
  );
};

export default ContentWrapper;
