import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/Form/FormField";
import { Select } from "@/components/Form/Select";
import { InputNumber} from "@/components/Form/Input";

import { Estrato } from "@/constants/tipoEstrato";

export default function BaseDescriptionField({Estratos}: {Estratos: Estrato[]}) {
    const { control } = useFormContext();
    return (
        <fieldset className="fieldset-base grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3">
            <legend className="text-gray-500 px-2">Descripcion base</legend>
            <FormField control={control} name="stratum" label="Estrato" placeholder="Estrato" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Estratos} />
            <FormField control={control} name="built_year" label="Año construido" rules={{ max: { value: 2025, message: "Introduce un valor menor o igual a 2025" } }} component={InputNumber} />
            <FormField control={control} name="level" label="Niveles" rules={{ max: { value: 50, message: "Introduce un valor menor o igual a 60" } }} component={InputNumber} />
            <FormField control={control} name="floor" label="Piso" rules={{ max: { value: 4, message: "Introduce un valor menor o igual a 4" } }} component={InputNumber} />
            <hr className="border-gray-400 border col-span-2 md:col-span-3 lg:col-span-4" />
            <FormField control={control} name="bedrooms" label="Habitaciones" rules={{ max: { value: 10, message: "Introduce un valor menor o igual a 10" } }} component={InputNumber} />
            <FormField control={control} name="bathrooms" label="Baños" rules={{ max: { value: 10, message: "Introduce un valor menor o igual a 10" } }} component={InputNumber} />
            <FormField control={control} name="parking" label="Parqueaderos" rules={{ max: { value: 5, message: "Introduce un valor menor o igual a 5" } }} component={InputNumber} />
            <FormField control={control} name="parking_covered" label="Parqueaderos cubiertos" rules={{ max: { value: 5, message: "Introduce un valor menor o igual a 5" } }} component={InputNumber} />
            <hr className="border-gray-400 border col-span-2 md:col-span-3 lg:col-span-4" />
            <FormField control={control} name="area_lot" label="Area lote M²" rules={{ required: "Este campo es obligatorio:", max: { value: 5000, message: "Introduce un valor menor o igual a 5000" } }} component={InputNumber} componentProps={{ step: "0.01" }} />
            <FormField control={control} name="area_cons" label="Area construida M²" rules={{ required: "Este campo es obligatorio:", max: { value: 1000000, message: "Introduce un valor menor o igual a 1000000" } }} component={InputNumber} componentProps={{ step: "0.01" }} />
            <FormField control={control} name="private_area" label="Area privada M²" rules={{ required: "Este campo es obligatorio:", max: { value: 4000, message: "Introduce un valor menor o igual a 4000" } }} component={InputNumber} componentProps={{ step: "0.01" }} />
        </fieldset>
    )
}