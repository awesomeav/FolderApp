import React from 'react';
import { useController } from 'react-hook-form';

type RadioProps = {
  selected?: boolean;
  onSelect?: () => any;
  disabled: boolean;
  name: string;
  value?: string;
  checked?: boolean;
  onChange?: () => void;
  label: string;
  dataTestId?: string;
};

type AppProps = {
  name: string;
  control: any;
  buttons: Record<string, any>;
  label: string;
  disabled: boolean;
  value?: string;
  onChange?: () => any;
};
const RadioButton: React.FC<RadioProps> = ({
  name,
  value,
  disabled = false,
  checked = false,
  onChange = () => null,
  label
}) => (
  <div className="mr-4">
    <input
      type="radio"
      name={name}
      disabled={disabled}
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <label className="ml-2 text-sm leading-none font-medium">{label}</label>
  </div>
);

const RadioButtonGroup: React.FC<AppProps> = ({
  name,
  control,
  buttons,
  value,
  disabled,
  onChange,
  label
}) => {
  const { field } = useController({ name, control });

  return (
    <div className="mb-6">
      <div className="mb-2 text-sm font-semibold">{label}</div>
      <div className="flex">
        {buttons.map((button: any) => (
          <RadioButton
            key={button.value}
            name={button.name}
            disabled={disabled}
            checked={field.value === button.value}
            label={button.label}
            onChange={() => field.onChange(button.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default RadioButtonGroup;
