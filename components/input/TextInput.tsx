import { ChangeEventHandler } from "react";

type TextInputProps = {
  id: string;
  label: string;
  defaultValue: string | null;
  onChange: ChangeEventHandler;
  disabled?: boolean;
  hint?: string;
};
export default function TextInput({
  id,
  label,
  defaultValue,
  hint,
  disabled,
  onChange,
}: TextInputProps) {
  return (
    <div className="flex flex-wrap mb-6 -mx-3">
      <div className="w-full px-3">
        <label
          className="block mb-2 text-xs font-bold tracking-wide text-gray-200 uppercase"
          htmlFor={`${id}Field`}
        >
          {label}
        </label>
        <input
          className="block w-full px-4 py-3 mb-3 leading-tight text-gray-200 bg-gray-700 border border-gray-200 rounded "
          id={`${id}Field`}
          type="text"
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
        />
        {hint && <p className="text-xs italic text-gray-400">{hint}</p>}
      </div>
    </div>
  );
}
