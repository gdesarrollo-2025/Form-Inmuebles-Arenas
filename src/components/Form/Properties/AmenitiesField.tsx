"use client"
import { Amenidad } from "@/constants/tipoAmenidades"
import { useState, useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form";

import { getAmenities } from "@/lib/domus_connection";
import { FormField } from "../FormField";
import { AmenitiesSelect } from "../Checkbox";

export default function AmenitiesField() {
    const { control } = useFormContext();
    const [amenities, setAmenities] = useState<Amenidad[]>([]);

    const type = useWatch({ control, name: "type" });
    useEffect(() => {
        const fetchAmenities = async () => {
            /* const data = await getAmenities(type);
            setAmenities(data) */
        }
        fetchAmenities();
    }, [type])
    return (
        <div>
            <fieldset className="fieldset-base">
                <legend className="text-gray-500 px-2">Caracteristicas Interiores</legend>
                <FormField control={control} name="amenities" component={AmenitiesSelect} options={amenities} componentProps={{"typeFilter": 1}}/>
            </fieldset>
            <fieldset className="fieldset-base">
                <legend className="text-gray-500 px-2">Caracteristicas exteriores</legend>
                <FormField control={control} name="amenities" component={AmenitiesSelect} options={amenities} componentProps={{"typeFilter": 2}}/>
            </fieldset>
            <fieldset className="fieldset-base">
                <legend className="text-gray-500 px-2">Caracteristicas generales</legend>
                <FormField control={control} name="amenities" component={AmenitiesSelect} options={amenities} componentProps={{"typeFilter": 3}}/>
            </fieldset>
        </div>
    )
}