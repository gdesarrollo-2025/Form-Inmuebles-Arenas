import {useEffect} from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormField } from "@/components/Form/FormField";
import { Select } from "@/components/Form/Select";
import { Departamento } from "@/constants/tipoDepartamento";
import { Ciudad } from "@/constants/tipoCiudad";
import { Zona } from "@/constants/tipoZona";
import { Barrio } from "@/constants/tipoBarrio";

export default function LocalizationField({ Departamentos, Ciudades, Zonas, Barrios }: { Departamentos: Departamento[], Ciudades: Ciudad[], Zonas: Zona[], Barrios: Barrio[] }) {
    const { control, setValue } = useFormContext();

    //variables para saber los valores del departamento y la ciudad
    const state = useWatch({ control, name: "state" });
    const city = useWatch({ control, name: "city" });

    useEffect(() => {
        if (state) {
          setValue("city", ""); setValue("city_zone", ""); setValue("neighborhood_code", "");
        }
      }, [state])
    
      useEffect(() => {
        if (city) {
          setValue("city_zone", ""); setValue("neighborhood_code", "");
        }
      }, [city, setValue])
      
    return (
        <fieldset className="fieldset-base">
            <legend className="text-gray-500">Direccion general</legend>
            <FormField control={control} name="country" label="Pais" placeholder="Pais" component={Select} options={[{ code: 1, name: "Colombia" }]} />
            <FormField control={control} name="state" label="Departamento" placeholder="Departamento" component={Select} options={Departamentos} />
            <FormField control={control} name="city" label="Ciudad" placeholder="Ciudad" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Ciudades.filter((c) => c.state_code == state)} />
            <FormField control={control} name="city_zone" label="Zona" placeholder="Zona" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Zonas.filter((z) => z.city_code == city)} />
            <FormField control={control} name="neighborhood_code" label="Barrio" placeholder="Barrio" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Barrios.filter((b) => b.city_code == city)} />
        </fieldset>
    )
}