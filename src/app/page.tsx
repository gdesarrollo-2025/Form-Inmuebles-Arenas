"use client";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

//Todos los types e interfaces
import { Propiedades } from "@/constants/tipoPropiedad";
import { Negocios } from "@/constants/tipoNegocio";
import { Destinaciones } from "@/constants/tipoDestinacion";
import { Estratos } from "@/constants/tipoEstrato";
import { initialInmueble, InmuebleForm } from "@/types/inmuebles";
import { StateAlert } from "@/components/Form/FormAlert";

//Todos los Componentes creados
import GlobalAlert from "@/components/Form/FormAlert";
import PropietariosField from "@/components/Form/Properties/PropietariosField";
import AdministrativoField from "@/components/Form/Properties/AdministrativoField";
import BaseDescriptionField from "@/components/Form/Properties/BaseDescriptionField";
import ValoresField from "@/components/Form/Properties/ValoresField";
import DescriptionField from "@/components/Form/Properties/DescriptionField";
import LocalizationField from "@/components/Form/Properties/LocalizationField";
import AddressField from "@/components/Form/Properties/AddressField";

//Todas las constantes
import { Departamentos } from "@/constants/tipoDepartamento";
import { Ciudades } from "@/constants/tipoCiudad";
import { Zonas } from "@/constants/tipoZona";
import { Barrios } from "@/constants/tipoBarrio";
import { Direccion_1, Direccion_2, Direccion_3, Direccion_4 } from "@/constants/tipoDireccion";
import AmenitiesField from "@/components/Form/Properties/AmenitiesField";

const Map = dynamic(() => import("@/components/Form/Map"), { ssr: false });

export default function Home() {
  const methods = useForm<InmuebleForm>({
    defaultValues: initialInmueble
  });

  //permite las alertas globales
  const [alert, setAlert] = useState<StateAlert>({
    show: false,
    destructive: false,
    title: "",
    description: "",
    fadeOut: false,
  });

  const { handleSubmit} = methods;

  const onSubmit = (data: InmuebleForm) => {
    console.log("Datos finales:", data);
  };

  const onError = () => {
    setAlert({
      show: true,
      destructive: true,
      title: "Error en el formulario",
      description: "Revisa los campos requeridos antes de enviar el formulario."
    });
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="p-3">
          {/* Maneja los errores globales */}
          <GlobalAlert alert={alert}  setAlert={setAlert}/>
          {/* Informacion Basica */}
          <details className="details-base">
            <summary className="summary-base">Informacion Basica</summary>
            {/* Informacion administrativa */}
            <AdministrativoField Propiedades={Propiedades} Negocios={Negocios} Destinaciones={Destinaciones} />
            {/* Descripcion base */}
            <BaseDescriptionField Estratos={Estratos} />
            {/* Propietarios */}
            <PropietariosField setAlert={setAlert}/>
            {/* Valores */}
            <ValoresField />
            {/* Descripcion y Comentarios */}
            <DescriptionField />
          </details>
          {/* Ubicación y Direccion del inmueble */}
          <details className="details-base">
            <summary className="summary-base">Ubicación del inmueble</summary>
            {/* Localizacion general */}
            <LocalizationField Departamentos={Departamentos} Ciudades={Ciudades} Zonas={Zonas} Barrios={Barrios} />
            {/* Direccion especifica */}
            <AddressField Direccion_1={Direccion_1} Direccion_2={Direccion_2} Direccion_3={Direccion_3} Direccion_4={Direccion_4} Ciudades={Ciudades} setAlert={setAlert}/>
          </details>
          {/* Amenidades/Caracteristicas */}
          <details className="details-base">
            <summary className="summary-base">Amenidades / Caracteristicas</summary>
            <AmenitiesField />
          </details>
          <div className="fixed flex items-center gap-2 right-5 bottom-5 z-30">
            <button type="submit" className="order-2 size-14 border-2 border-secondary shadow-md bg-primary text-white rounded-full flex items-center justify-center peer z-80"><FaPaperPlane className="size-6" /></button>
            <p className="p-2 text-sm rounded-full order-1 transition-all ease-in duration-100 text-secondary bg-quaternary border-2  border-secondary opacity-0 peer-hover:opacity-100">Enviar inmueble</p>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
