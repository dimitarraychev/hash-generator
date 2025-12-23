import "./NumberInput.css";

interface NumberInputProps {
  value: number;
  name: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = ({
  value,
  name,
  label,
  step = 1,
  min,
  max,
  onChange,
}: NumberInputProps) => {
  const update = (newVal: number) => {
    if (min !== undefined && newVal < min) newVal = min;
    if (max !== undefined && newVal > max) newVal = max;

    if (onChange) {
      const event = {
        target: { name, value: newVal },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <>
      {label != "" && <label htmlFor={name}>{label}</label>}

      <div className="number-input-wrapper">
        <input type="number" name={name} value={value} onChange={onChange} />
        <div className="arrows">
          <div className="up" onClick={() => update(value + step)}>
            ▲
          </div>
          <div className="down" onClick={() => update(value - step)}>
            ▼
          </div>
        </div>
      </div>
    </>
  );
};

export default NumberInput;
