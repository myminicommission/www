import { ChangeEventHandler } from "react";
import { v4 as uuidv4 } from "uuid";

type SelectProps = {
  id?: string;
  label: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  children?:
    | React.ReactElement<OptionProps>
    | React.ReactElement<OptionProps>[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
};

type OptionProps = {
  children: string;
  value?: string;
  selected?: boolean;
  disabled?: boolean;
};

export function Select({
  id,
  label,
  required,
  className,
  defaultValue,
  children,
  onChange,
  disabled,
}: SelectProps) {
  const elementID = id ? id : uuidv4();

  return (
    <>
      <label
        htmlFor={elementID}
        className="block text-sm font-medium text-gray-400"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={elementID}
        name={elementID}
        className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${className}`}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </select>
    </>
  );
}

export function Option({ children, value, disabled, selected }: OptionProps) {
  return (
    <option selected={selected} disabled={disabled} value={value}>
      {children}
    </option>
  );
}
