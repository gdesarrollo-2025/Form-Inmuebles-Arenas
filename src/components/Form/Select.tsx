'use client';
import React from "react";
import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { CommandGroup } from "cmdk";
import { getBrokers } from "@/lib/domus_connection";
import { Asesor } from "@/constants/tipoAsesor";
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
  onChange: (value: string | number) => void;
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
        onChange={(e) => onChange(Number(e.target.value))}
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


interface SearchableSelectProps {
  label: string;
  placeholder: string;
  value: Asesor | string | number;
  options: Option[];
  onChange: (val: string | number) => void;
}

export function SearchableSelect({ value, label, placeholder, options, onChange }: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col group">
      <label className="label-base group">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="input-base" type="button">
            {value ? options.find((o) => o.code === value)?.name ?? placeholder
              : placeholder}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-60">
          <Command>
            <CommandInput placeholder="Seleccione una opción" />
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            <CommandList>
              <CommandGroup heading="Opciones">
                {options.map((option, idx) => (
                  <CommandItem
                    key={idx}
                    value={option.name}
                    onSelect={() => {
                      onChange(Number(option.code)); // 🔑 usar onChange de RHF
                      setOpen(false);
                    }}
                  >
                    {option.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}