import ReactJson from "react-json-view";
import "./JsonViewer.css";

interface JsonViewerProps {
  jsonData: {};
  title: string;
}

const JsonViewer = ({ jsonData, title }: JsonViewerProps) => {
  return (
    <div className="json-view-wrapper">
      <label className="json-title">{title}</label>
      <ReactJson
        src={jsonData}
        theme="summerfruit"
        style={{ backgroundColor: "var(--sidebar-bg)", fontSize: "16px" }}
        enableClipboard={true}
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </div>
  );
};

export default JsonViewer;
