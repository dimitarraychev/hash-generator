import { useState } from "react";
import ReactJson from "react-json-view";
import "./JsonViewer.css";
import expandSvg from "../../assets/expand.svg";
import collapseSvg from "../../assets/collapse.svg";

interface JsonViewerProps {
  jsonData: {};
  title: string;
}

const JsonViewer = ({ jsonData, title }: JsonViewerProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="json-view-wrapper">
      <label className="json-title">{title}</label>
      <ReactJson
        src={jsonData}
        theme="summerfruit"
        style={{ backgroundColor: "var(--card-bg)", fontSize: "16px" }}
        enableClipboard={true}
        displayDataTypes={false}
        displayObjectSize={false}
        collapsed={isCollapsed}
      />

      <div className="json-buttons-wrapper">
        <img
          src={isCollapsed ? expandSvg : collapseSvg}
          alt={isCollapsed ? "Expand" : "Collapse"}
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="expand-btn"
          title={isCollapsed ? "Expand" : "Collapse"}
        />
      </div>
    </div>
  );
};

export default JsonViewer;
