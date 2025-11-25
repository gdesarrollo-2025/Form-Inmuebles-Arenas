import React from "react";

interface Option {
  code?: string | number;
  name?: string;
}

interface SelectProps {
  label: string;
  value: string | number;
  name: string;
  placeholder: string;
  options: (Option | string)[];
  required?:boolean;
  toggleState: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  label,
  value,
  name,
  placeholder,
  options,
  required=false,
  toggleState,
}: SelectProps) {
  return (
    <div className="flex flex-col group">
      <label className="text-gray-500 group-focus-within:text-primary">
        {label}
      </label>

      <select
        onChange={toggleState}
        name={name}
        value={value}
        className="h-[27px] border border-gray-400 rounded px-2 placeholder:text-gray-500 text-black focus-within:outline-primary focus-within:border-primary focus-within:border-2"
      >
        <option value={0} hidden>
          {placeholder}
        </option>

        {options.map((op, idx) => {
          const value = typeof op === "string" ? idx : op.code ?? idx;
          const label = typeof op === "string" ? op : op.name ?? op.code;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

