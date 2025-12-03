import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import dynamic from "next/dynamic";

import { FormField } from "@/components/Form/FormField";
import { Select } from "@/components/Form/Select";
import { InputNumber } from "@/components/Form/Input";
import { InputText } from "@/components/Form/Input";

import { Direccion } from "@/constants/tipoDireccion";
import { Ciudad } from "@/constants/tipoCiudad";
import { LocatorResult } from "@/lib/locator";
import { Nomenclatura } from "@/constants/tipoDireccion";

import { getCoords, getAddress } from "@/lib/locator";
import { StateAlert } from "@/app/page";

const Map = dynamic(() => import("@/components/Form/Properties/Map"), { ssr: false });

export default function AddressField({ Direccion_1, Direccion_2, Direccion_3, Direccion_4, Ciudades, setAlert }: { Direccion_1: Direccion[], Direccion_2: Direccion[], Direccion_3: Direccion[], Direccion_4: Direccion[], Ciudades: Ciudad[], setAlert: React.Dispatch<React.SetStateAction<StateAlert>> }) {
    const { control, setValue } = useFormContext();

    //variables para saber los valores de la direccion
    const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10] = useWatch({
        control, name: [
            "dir_1", "dir_2", "dir_3", "dir_4", "dir_5",
            "dir_6", "dir_7", "dir_8", "dir_9", "dir_10",
        ]
    })

    //variable para saber el valor de address 
    const address = useWatch({ control, name: "address" });

    const city = useWatch({ control, name: "city" });

    //Funcion para actualizar la latitud y longitud desde el mapa
    const updateCoords = ({ lat, lon }: { lat: number; lon: number }) => {
        setValue("latitude", lat);
        setValue("longitude", lon);
    };

    const handleLocation = async (): Promise<void> => {
        if (!d1 || !d2 || !d7 || !d9) {
            setAlert({
                show: true,
                destructive: true,
                title: "Faltan datos",
                description: "Debes completar los tres campos mínimos Tipo de via, Numero de la via, Numeros de la vias secundaria y complemento para buscar la dirección."
            });
            return;
        }

        const { lat, lon }: LocatorResult = await getCoords(`${address}, ${Ciudades.find((c) => c.code == city)?.name}, Colombia`);

        setValue("latitude", lat); setValue("longitude", lon);
    };

    //variables para saber el valor de latitude y longitude
    const lat = useWatch({ control, name: "latitude" });
    const lon = useWatch({ control, name: "longitude" });

    //Actualiza la informacion de address con cada cambio en los selects
    useEffect(() => {
        const direccion: Nomenclatura = {
            dir_1: d1,
            dir_2: d2,
            dir_3: d3,
            dir_4: d4,
            dir_5: d5,
            dir_6: d6,
            dir_7: d7,
            dir_8: d8,
            dir_9: d9,
            dir_10: d10
        }
        setValue("address", `${getAddress(direccion)}`)
    }, [d1, d2, d3, d4, d5,
        d6, d7, d8, d9, d10, setValue]);
    return (
        <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500">Dirección especifica</legend>
            <div className="flex flex-col lg:flex-row gap-3">
                {/* Via Principal */}
                <div className="flex flex-col justify-between">
                    <label className="label-base">Via principal</label>
                    <div className="grid grid-cols-3 gap-2 lg:flex">
                        <FormField control={control} name="dir_1" label="Tipo de via" placeholder="Tipo de via..." component={ Select } options={Direccion_1} />
                        <FormField control={control} name="dir_2" label="Numeracion" component={InputNumber} />
                        <FormField control={control} name="dir_3" label="Letra" placeholder="Letra..." component={ Select } options={Direccion_2} />
                        <FormField control={control} name="dir_4" label="Bis" placeholder="Bis..." component={ Select } options={Direccion_3} />
                        <FormField control={control} name="dir_5" label="Letra de Bis" placeholder="Letra..." component={ Select } options={Direccion_2} />
                        <FormField control={control} name="dir_6" label="Orientación" placeholder="Orientacion..." component={ Select } options={Direccion_4} />
                    </div>
                </div>
                {/* Via Secundaria */}
                <div className="flex flex-col justify-between">
                    <label className="label-base"># Via Secundaria</label>
                    <div className="grid grid-cols-2 gap-1">
                        <FormField control={control} name="dir_7" label="Numero" component={InputNumber} />
                        <FormField control={control} name="dir_8" label="Letra" placeholder="Letra..." component={ Select } options={Direccion_2} />
                    </div>
                </div>
                {/* Via complementaria */}
                <div className="flex flex-col justify-between">
                    <label className="label-base">- Via Complemento</label>
                    <div className="grid grid-cols-2 gap-1">
                        <FormField control={control} name="dir_9" label="Numero" component={InputNumber} />
                        <FormField control={control} name="dir_10" label="Orientación" placeholder="Orientación..." component={ Select } options={Direccion_4} />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-end">
                <FormField control={control} name="address" label="Direccion final" rules={{ required: "Este campo es obligatorio" }} component={InputText} componentProps={{ readonly: true, classname: "w-3/4" }} />
                <button type="button" className="button-base h-10 flex items-center text-sm" onClick={handleLocation}> Buscar direccion</button>
            </div>
            <Map lat={lat || 4.710989} lon={lon || -74.072090} setCoords={updateCoords} />
        </fieldset>
    )
}