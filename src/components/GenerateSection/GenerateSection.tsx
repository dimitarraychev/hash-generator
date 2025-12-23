import { useGenerate } from "../../hooks/useGenerate";
import Button from "../Button/Button";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import NumberInput from "../NumberInput/NumberInput";

const GenerateSection = () => {
  const initialSettings = {
    count: 2,
    length: 16,
    excludeAmbiguous: true,
  };

  const { settings, handleChange, generate } = useGenerate(initialSettings);

  return (
    <section className="converter-section section">
      <h2 className="section-header">Generate Key</h2>
      <div className="section-columns">
        <div className="settings">
          <NumberInput
            name="count"
            label="Number of Keys:"
            value={settings.count}
            min={1}
            max={100}
            onChange={handleChange}
          />

          <NumberInput
            name="length"
            label="Key Length:"
            value={settings.length}
            min={6}
            max={32}
            onChange={handleChange}
          />

          <label>
            Exclude Ambiguous Characters:
            <input
              type="checkbox"
              name="excludeAmbiguous"
              checked={settings.excludeAmbiguous}
              onChange={handleChange}
            />
          </label>

          <Button title="Re-Generate" text="Re-Generate" onClick={generate} />
        </div>

        <ContentWrapper
          hasInput={false}
          input=""
          output={settings.passwords.join("\n")}
          handleChange={() => {}}
        />
      </div>
    </section>
  );
};

export default GenerateSection;
