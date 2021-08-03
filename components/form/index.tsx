import { ChangeEventHandler } from "react";

type SelectProps = {
  id?: string;
  name?: string;
  label?: string;
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
  name,
  label,
  required,
  className,
  defaultValue,
  children,
  onChange,
  disabled,
}: SelectProps) {
  return (
    <>
      <label>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={name}
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
