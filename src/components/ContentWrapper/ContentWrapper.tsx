import "./ContentWrapper.css";
import AutoExpandingTextarea from "../AutoExpandingTextarea/AutoExpandingTextarea";

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
  return (
    <div className="content">
      {hasInput && (
        <AutoExpandingTextarea
          name="input"
          title="Input"
          value={input}
          showCopy
          onChange={handleChange}
          placeholder="Enter your input here..."
          minHeight={256}
          maxHeight={480}
        />
      )}

      <AutoExpandingTextarea
        name="output"
        title="Output"
        value={output}
        readOnly
        showCopy
        onChange={handleChange}
        placeholder="Output will appear here..."
        minHeight={256}
        maxHeight={480}
      />
    </div>
  );
};

export default ContentWrapper;
