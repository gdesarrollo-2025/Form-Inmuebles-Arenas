
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/Form/FormField";
import { SearchableSelect, Select } from "@/components/Form/Select";
import { Radio } from "@/components/Form/Radio";

import { Asesor } from "@/constants/tipoAsesor";
import { Propiedad } from "@/constants/tipoPropiedad";
import { Negocio } from "@/constants/tipoNegocio";
import { Destinacion } from "@/constants/tipoDestinacion";

import { Sucursales } from "@/constants/tipoSucursal";

import { getBrokers } from "@/lib/domus_connection";

export default function AdministrativoField({ Propiedades, Negocios, Destinaciones }: { Propiedades: Propiedad[], Negocios: Negocio[], Destinaciones: Destinacion[] }) {
  const { control } = useFormContext();
  const [asesores, setAsesores] = useState<Asesor[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      /* const data = await getBrokers();
      setAsesores(data); */
    };
    fetchData();
  }, []); 
  return (
    <fieldset className="fieldset-base grid gap-3 grid-cols-2">
      <legend className="text-gray-500 px-2">Administrativo</legend>
      <FormField control={control} name="type" label="Tipo de inmueble" placeholder="Selecciona el tipo de inmueble" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Propiedades} />
      <FormField control={control} name="biz" label="Gestion" rules={{ required: "Este campo es obligatorio" }} component={Radio} options={Negocios} />
      <FormField control={control} name="destination" label="Destino" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Destinaciones} />
      <FormField control={control} name="promoter_broker" label="Asesor promotor" placeholder="Selecciona el asesor promotor" rules={{ required: "Este campo es obligatorio" }} component={SearchableSelect} options={asesores} />
      <FormField control={control} name="branch" label="Sucursal" placeholder="Seleccione la sucursal" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Sucursales} />
    </fieldset>
  )
}