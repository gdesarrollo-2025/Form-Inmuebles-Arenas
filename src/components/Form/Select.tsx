import React from "react";

//interfaz para interpretar las opciones o el formato general
interface Option {
  code?: string | number;
  name?: string;
}

//tipado para las propiedades del select
interface SelectProps {
  label: string;
  value: string | number;
  name: string;
  placeholder?: string;
  options: (Option | string)[];
  onChange:( value:string|number) => void;
}

export function Select({
  label,
  value,
  name,
  placeholder = "Seleccion una opción",
  options,
  onChange,
}: SelectProps) {
  return (
    <div className="flex flex-col group">
      <label className="label-base">
        {label}
      </label>

      <select
        onChange={(e) => onChange( Number(e.target.value))}
        name={name}
        value={value}
        className="h-[27px] border border-gray-400 rounded px-2 placeholder:text-gray-500 text-black focus-within:outline-primary focus-within:border-primary focus-within:border-2"
      >
        {/* Valor estandar o placeholder inicial */}
        <option value="" hidden>
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

