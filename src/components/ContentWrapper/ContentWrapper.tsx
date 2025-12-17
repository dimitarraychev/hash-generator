import "./ContentWrapper.css";
import { toast } from "react-toastify";

interface ContentWrapperProps {
  input: string;
  output: string;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

const ContentWrapper = ({
  input,
  output,
  handleChange,
}: ContentWrapperProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("URL copied to clipboard ✅");
  };

  return (
    <div className="content">
      <label htmlFor="input">Input:</label>
      <textarea
        name="input"
        id="input"
        value={input}
        onChange={handleChange}
      />

      <label htmlFor="output">Output:</label>
      <textarea
        readOnly
        name="output"
        id="output"
        value={output}
        onChange={handleChange}
        onClick={handleCopy}
      />
    </div>
  );
};

export default ContentWrapper;
