import { useRef, useEffect } from "react";
import copySvg from "../../assets/copy.svg";
import { toast } from "react-toastify";
import "./AutoExpandingTextarea.css";

interface AutoExpandingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxHeight?: number;
  minHeight?: number;
  showCopy?: boolean;
}

const AutoExpandingTextarea = ({
  value,
  title,
  onChange,
  maxHeight = 512,
  minHeight = 48,
  showCopy = false,
  readOnly = false,
  ...props
}: AutoExpandingTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.minHeight = minHeight + "px";
    ta.style.maxHeight = maxHeight + "px";
    ta.style.height =
      Math.min(Math.max(ta.scrollHeight, minHeight), maxHeight) + "px";
    onChange(e);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard ✅");
  };

  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.minHeight = minHeight + "px";
      ta.style.maxHeight = maxHeight + "px";
      ta.style.height =
        Math.min(Math.max(ta.scrollHeight, minHeight), maxHeight) + "px";
    }
  }, [value, maxHeight, minHeight]);

  return (
    <div className="auto-textarea-wrapper">
      <label htmlFor={props.name}>{title}:</label>
      <textarea
        {...props}
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        readOnly={readOnly}
        className="auto-textarea"
        id={props.name}
      />
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
  );
};

export default AutoExpandingTextarea;
