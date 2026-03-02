import { useRef, useEffect, useState } from "react";
import copySvg from "../../assets/copy.svg";
import expandSvg from "../../assets/expand.svg";
import collapseSvg from "../../assets/collapse.svg";
import { toast } from "react-toastify";
import "./CustomTextarea.css";

interface CustomTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  title?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  minHeight?: number;
  showCopy?: boolean;
  showExpand?: boolean;
}

const CustomTextarea = ({
  value,
  title,
  onChange,
  minHeight = 48,
  showCopy = true,
  showExpand = true,
  readOnly = false,
  ...props
}: CustomTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (ta) {
      if (isExpanded) {
        ta.style.height = "auto";
        ta.style.height = Math.max(ta.scrollHeight, minHeight) + "px";
        ta.style.overflowY = "hidden";
      } else {
        ta.style.height = minHeight + "px";
        ta.style.overflowY = "auto";
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard!");
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    adjustHeight();
  }, [value, isExpanded, minHeight]);

  return (
    <div className="custom-text-area">
      {title && <label htmlFor={props.name}>{title}:</label>}

      <div className="custom-textarea-wrapper">
        <textarea
          {...props}
          ref={textareaRef}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className="custom-textarea"
          id={props.name}
        />

        <div className="textarea-buttons-wrapper">
          {showExpand && (
            <img
              src={isExpanded ? collapseSvg : expandSvg}
              alt={isExpanded ? "Collapse" : "Expand"}
              onClick={toggleExpand}
              className="expand-btn"
              title={isExpanded ? "Collapse" : "Expand"}
            />
          )}

          {showCopy && (
            <img
              src={copySvg}
              alt="Copy"
              onClick={handleCopy}
              className="copy-btn"
              title="Copy"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTextarea;
