import { useEffect, useState } from "react";
import "./Sha256.css";
import { generateSha256 } from "../../utils/sha256";
import { encodeHash } from "../../utils/encodeHash";

const Sha256 = () => {
  const [formData, setFormData] = useState<{
    input: string;
    output: string;
    inputEncoding: "utf8" | "hex" | "base64" | "";
    outputEncoding: "utf8" | "hex" | "base64" | "";
    keyEncoding: "utf8" | "hex" | "base64" | "";
    key: string;
  }>({
    input: "",
    output: "",
    inputEncoding: "",
    outputEncoding: "",
    keyEncoding: "",
    key: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  useEffect(() => {
    const computeHash = async () => {
      if (!formData.input) {
        setFormData((prev) => ({ ...prev, output: "" }));
        return;
      }

      try {
        const rawHash = await generateSha256(
          formData.input,
          formData.key || undefined
        );

        const encodedHash = encodeHash(
          rawHash,
          formData.outputEncoding || "hex"
        );

        setFormData((prev) => ({ ...prev, output: encodedHash }));
      } catch (err) {
        console.error(err);
        setFormData((prev) => ({ ...prev, output: "Error computing hash" }));
      }
    };

    computeHash();
  }, [formData.input, formData.key, formData.outputEncoding]);

  return (
    <section className="sha256">
      <div className="settings">
        <label htmlFor="inputEncoding">Input Encoding:</label>
        <select
          name="inputEncoding"
          id="inputEncoding"
          value={formData.inputEncoding}
          onChange={handleChange}
        >
          <option value="utf8">UTF-8</option>
          <option value="hex">Hex</option>
          <option value="base64">Base64</option>
        </select>

        <label htmlFor="outputEncoding">Output Encoding:</label>
        <select
          name="outputEncoding"
          id="outputEncoding"
          value={formData.outputEncoding}
          onChange={handleChange}
        >
          <option value="hex">Hex</option>
          <option value="base64">Base64</option>
        </select>

        <details className="hmac-wrapper">
          <summary>HMAC</summary>

          <div className="hmac-content">
            <label htmlFor="keyEncoding">Key Encoding:</label>
            <select
              name="keyEncoding"
              id="keyEncoding"
              value={formData.keyEncoding}
              onChange={handleChange}
            >
              <option value="utf8">UTF-8</option>
              <option value="hex">Hex</option>
              <option value="base64">Base64</option>
            </select>

            <label htmlFor="key">Key:</label>
            <input
              type="text"
              name="key"
              id="key"
              value={formData.key}
              onChange={handleChange}
            />
          </div>
        </details>
      </div>

      <div className="layout">
        <label htmlFor="input">Input:</label>
        <textarea
          name="input"
          id="input"
          value={formData.input}
          onChange={handleChange}
        />

        <label htmlFor="output">Output:</label>
        <textarea
          readOnly
          name="output"
          id="output"
          value={formData.output}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default Sha256;
