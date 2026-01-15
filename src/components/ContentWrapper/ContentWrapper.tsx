import "./ContentWrapper.css";
import CustomTextarea from "../CustomTextarea/CustomTextarea";

interface ContentWrapperProps {
  hasInput?: boolean;
  input: string;
  output: string | string[];
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
  const isArray = Array.isArray(output);
  const outputs = isArray ? output : [output];

  return (
    <div className="content">
      {hasInput && (
        <CustomTextarea
          name="input"
          title="Input"
          value={input}
          showCopy
          onChange={handleChange}
          placeholder="Enter your input here..."
          minHeight={272}
        />
      )}

      {outputs.map((item, idx) => (
        <CustomTextarea
          key={idx}
          name={`output-${idx}`}
          title={idx === 0 ? "Output" : ""}
          value={item}
          readOnly
          showCopy
          onChange={handleChange}
          placeholder="Output will appear here..."
          minHeight={isArray ? 48 : 272}
        />
      ))}
    </div>
  );
};

export default ContentWrapper;
