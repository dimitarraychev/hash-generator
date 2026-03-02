import "./ContentWrapper.css";
import CustomTextarea from "../CustomTextarea/CustomTextarea";
import JsonViewer from "../JsonViewer/JsonViewer";

interface ContentWrapperProps {
  hasInput?: boolean;
  hasJsonViewerOutput?: boolean;
  input: string;
  output: string | string[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}

const ContentWrapper = ({
  hasInput = true,
  hasJsonViewerOutput = false,
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
          onChange={handleChange}
          placeholder="Enter your input here..."
          minHeight={272}
        />
      )}

      {!hasJsonViewerOutput &&
        outputs.map((item, idx) => (
          <CustomTextarea
            key={idx}
            name={`output-${idx}`}
            title={idx === 0 ? "Output" : ""}
            value={item}
            readOnly
            showExpand={hasInput}
            onChange={handleChange}
            placeholder="Output will appear here..."
            minHeight={isArray ? 53 : 272}
          />
        ))}

      {hasJsonViewerOutput && <JsonViewer jsonData={output} title="Output:" />}
    </div>
  );
};

export default ContentWrapper;
