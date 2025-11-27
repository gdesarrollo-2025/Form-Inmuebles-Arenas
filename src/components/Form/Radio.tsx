import React from "react";

interface Option {
    code?: string | number;
    name?: string;
}

interface RadioProps {
    label: string;
    name: string;
    options: (Option | string)[];
    onChange: (value: number | "") => void;
    ref?: React.Ref<HTMLInputElement>;
}

export function Radio({
    label,
    name,
    options,
    onChange,
    ref
}: RadioProps) {
    return (
        <div className=" flex flex-col group">
            <label className="label-base">{label}</label>
            <div className="flex flex-col md:flex-row gap-2">
                {options.map((op, idx) => {
                    const value = typeof op === "string" ? idx : op.code ?? idx;
                    const label = typeof op === "string" ? op : op.name ?? op.code
                    return (
                        <div key={value} className="radio-base">
                            <input type="radio" name={name} value={value} onChange={(e) => onChange( Number(e.target.value))} /> <label>{label}</label>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}