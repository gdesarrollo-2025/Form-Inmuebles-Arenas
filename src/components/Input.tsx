
"use client";
import React from "react";

interface InputPriceProps {
  label: string;
  name: string;
  value: number | undefined;
  placeholder?: string;
  toggleState: (name: string, value: number) => void;
}

interface InputNumberProps {
  label: string;
  name: string;
  value: number |undefined;
  min?: number;
  max?: number;
  step?: string;
  toggleState: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



export function InputPrice({
  label,
  name,
  value,
  placeholder,
  toggleState
}: InputPriceProps) {

  const formatDisplay = (num?: number) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const parseRaw = (v: string): number => {
    const raw = v.replace(/\./g, "");
    return Number(raw || 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawNumber = parseRaw(e.target.value);
    toggleState(name, rawNumber);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const rawNumber = parseRaw(e.target.value);

    if (isNaN(rawNumber)) {
      alert("Solo números");
      toggleState(name, 0);
    }
  };

  return (
    <div className="flex flex-col group">
      <label className="label-base">{label}</label>
      <input
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
  value ,
  min = 0,
  max = Infinity,
  step = "1",
  toggleState
}: InputNumberProps) {
  return (
    <div className="flex flex-col group">
      <label className="label-base">{label}</label>
      <input
        className="input-base"
        type="number"
        name={name}
        value={value}
        min={min}
        max= {max}
        step= {step}
        onChange={toggleState}
      />
    </div>
  );
}
