interface Amenity {
    code: string;
    name: string;
    type: number;
}

interface AmenitiesSelectProps {
    value: string[]; // el array de códigos seleccionados
    onChange: (val: string[]) => void;
    options: Amenity[];
    typeFilter?: number; // opcional, para filtrar por tipo
}

export function AmenitiesSelect({ value, onChange, options, typeFilter = 1 }: AmenitiesSelectProps) {
    const handleToggle = (code: string) => {
        if (value.includes(code)) {
            // quitar del array
            onChange(value.filter((v) => v !== code));
        } else {
            // agregar al array
            onChange([...value, code]);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-y-2 gap-x-1 md:grid-cols-3 lg:grid-cols-5  ">
            {options.filter((a) => a.type === typeFilter).map((a) => (
                <div key={a.code} className="group">
                    <label className=" gap-1 flex items-center label-base text-sm md:text-base text-balance">
                        <input
                            type="checkbox"
                            checked={value.includes(a.code)}
                            onChange={() => handleToggle(a.code)}
                            className="appearance-none size-4 border-2 border-secondary rounded-sm checked:bg-primary transition-colors duration-200"/>
                        <span>{a.name.replace("/", " / ").replace("y / o", "y/o")}</span>
                    </label>
                </div>
            ))}
        </div>
    );
}
