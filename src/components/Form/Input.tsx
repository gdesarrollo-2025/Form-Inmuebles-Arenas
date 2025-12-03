"use client";
import React from "react";

//propiedades para un Input destinado a canon,venta y administracion
interface InputPriceProps {
  label: string;
  name: string;
  value: number | "";
  placeholder?: string;
  onChange: (value: number | "") => void;
  onBlur?: () => void;
  ref?: React.Ref<HTMLInputElement>;
}

//propiedades para un input numerico generico
interface InputNumberProps {
  label: string;
  name: string;
  value: number | "";
  min?: number;
  max?: number;
  step?: string;
  onChange: (value: number | "") => void;
  onBlur?: () => void;
  ref?: React.Ref<HTMLInputElement>;
}

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  readonly?: boolean;
  classname?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function InputPrice({
  label,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  ref
}: InputPriceProps) {

  //formatea el objeto tipo number agregando . cada unidad de mil
  const formatDisplay = (num?: number | "") => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  //reemplaza el formato string  . a un tipo entero
  const parseRaw = (v: string): number => {
    const raw = v.replace(/\./g, "");
    return Number(raw || 0);
  };
  //permite actualizar el valor del input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawNumber = parseRaw(e.target.value);
    onChange(rawNumber);
  };

  //permite que el asesor no coloque letras en un input de precio
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const rawNumber = parseRaw(e.target.value);

    if (isNaN(rawNumber)) {
      alert("Solo números");
      onChange(0)
    }
  };

  return (
    <div className="flex flex-col group">
      <label className="label-base">{label}</label>
      <input
        ref={ref}
        name={name}
        type="text"
        className="input-base"
        value={formatDisplay(value)}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

export function InputNumber({
  label,
  name,
  value,
  min = 0,
  max = Infinity,
  step = "1",
  onChange,
  onBlur,
  ref
}: InputNumberProps) {
  return (
    <div className="flex flex-col group">
      <label className="label-base">{label}</label>
      <input
        ref={ref}
        className="input-base"
        type="number"
        name={name}
        value={value}
        min={min}
        max={max}
        step={step}
        onBlur={onBlur}
        onChange={(e) => {
          const num = e.target.valueAsNumber;

          // Si está vacío → mandar ""
          if (e.target.value === "") {
            onChange("");
            return;
          }

          // Si no → mandar número
          onChange(isNaN(num) ? "" : num);
        }}
      />
    </div>
  );
}

export function InputText({
  label,
  name,
  value,
  onChange,
  onBlur,
  readonly,
  classname,
  ref,
}: InputTextProps) {
  return (
    <div className="flex flex-col group ">
      <label className="label-base">{label}</label>
      <input
        className={`border border-gray-400 rounded px-2 placeholder:text-gray-500 text-black focus:outline-terciary ${classname}`}
        ref={ref}
        name={name}
        value={value}
        readOnly={readonly}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        type="text" />
    </div>
  )
}