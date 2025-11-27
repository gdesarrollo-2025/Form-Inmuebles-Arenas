"use client"
import React from "react";

interface TextAreaProps {
    label: string;
    name: string;
    value: string;
    rows?: number;
    onChange: (value: string) => void;
    onBlur?: () => void;
}

export function TextArea({
    label,
    name,
    value,
    onChange,
    onBlur,
    rows = 5,
}: TextAreaProps) {
    return (
        <div className="flex flex-col group">
            <label className="label-base">{label}</label>
            <textarea
                className="border border-gray-400 rounded-lg focus-within:outline-primary p-2"
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                name={name}
                value={value}
                rows={rows} />
        </div>
    )
}