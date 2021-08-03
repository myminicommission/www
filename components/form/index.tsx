import { ChangeEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";

type SelectProps = {
  id?: string;
  label: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  value?: string;
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
};

type OptionProps = {
  children: string;
  value?: string;
  disabled?: boolean;
};

type LabelProps = {
  elementID: string;
  label: string;
  required?: boolean;
};

export function Label({ elementID, label, required }: LabelProps) {
  return (
    <label
      htmlFor={elementID}
      className="block text-sm font-medium text-gray-400"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
}

export function Select({
  id,
  label,
  required,
  className,
  defaultValue,
  value,
  children,
  onChange,
  disabled,
}: SelectProps) {
  const elementID = id ? id : uuidv4();

  return (
    <>
      <Label elementID={elementID} label={label} required={required} />
      <select
        id={elementID}
        name={elementID}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${className}`}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </select>
    </>
  );
}

export function Option({ children, value, disabled }: OptionProps) {
  return (
    <option disabled={disabled} value={value}>
      {children}
    </option>
  );
}

type NumberInputProps = {
  id?: string;
  label: string;
  value: number;
  className?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  min?: number;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function NumberInput({
  id,
  label,
  value,
  className,
  placeholder,
  required,
  disabled,
  min,
  onChange,
}: NumberInputProps) {
  const elementID = id ? id : uuidv4();
  const classes = classNames(
    "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-600 bg-gray-900 rounded-md",
    disabled
      ? "text-gray-600 bg-gray-700 border-gray-900 cursor-not-allowed"
      : "",
    className
  );
  return (
    <>
      <Label elementID={elementID} label={label} required={required} />
      <div className="mt-1">
        <input
          type="number"
          name={elementID}
          id={elementID}
          className={classes}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          min={min}
          onChange={onChange}
        />
      </div>
    </>
  );
}
