"use client"
import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";


interface RHFFieldProps<T extends FieldValues, K extends Path<T>> {
    control: Control<T>;
    name: K;
    rules?: Omit<RegisterOptions<T, K>, "setValueAs" | "valueAsNumber" | "valueAsDate">;
    label?: string;
    placeholder?: string;
    component: React.FC<any>;
    componentProps?: Record<string, any>;
    options?: any;
}

export function FormField<T extends FieldValues, K extends Path<T>>({
    control,
    name,
    rules,
    label,
    placeholder,
    component: Component,
    componentProps = {},
    options,
}: RHFFieldProps<T,K>) {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2 w-full">
                    <Component {...field} {...componentProps} label={label} placeholder={placeholder} options={options} />
                    {fieldState.error && (
                        <p className="text-red-500 text-sm ">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    )
}