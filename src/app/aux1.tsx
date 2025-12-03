"use client";
import dynamic from "next/dynamic";
import { useForm, SubmitHandler, useWatch, FormProvider} from "react-hook-form";
import { useState, useEffect } from "react";
import {  FaPaperPlane } from "react-icons/fa";

//Todos los types e interfaces
import { Propiedades } from "@/constants/tipoPropiedad";
import { Negocios } from "@/constants/tipoNegocio";
import { Destinaciones } from "@/constants/tipoDestinacion";
import { Estratos } from "@/constants/tipoEstrato";
import { initialInmueble, InmuebleForm } from "@/types/inmuebles";

//Todos las funciones y types auxiliares
import { getCoords, LocatorResult, getAddress } from "@/lib/locator";

//Todos los Componentes creados
import { FormField } from "@/components/Form/FormField";
import { Select } from "@/components/Form/Select";
import { InputPrice, InputNumber, InputText } from "@/components/Form/Input";
import { Radio } from "@/components/Form/Radio";
import FormAlert from "@/components/Form/FormAlert";
import PropietariosField from "@/components/Form/Properties/PropietariosField";

//Todas las constantes
import { Departamentos } from "@/constants/tipoDepartamento";
import { Ciudades } from "@/constants/tipoCiudad";
import { Zonas } from "@/constants/tipoZona";
import { Barrios } from "@/constants/tipoBarrio";
import { Direccion_1, Direccion_2, Direccion_3, Direccion_4, Nomenclatura } from "@/constants/tipoDireccion";
import { TextArea } from "@/components/Form/TextArea";

const Map = dynamic(() => import("@/components/Form/Properties/Map"), { ssr: false });

export default function Home() {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<InmuebleForm>({
    defaultValues: initialInmueble
  });
  
  const [alert, setAlert] = useState<{
    show: boolean;
    destructive?: boolean;
    title: string;
    description: string;
    fadeOut?: boolean;
  }>({
    show: false,
    destructive: false,
    title: "",
    description: "",
    fadeOut: false,
  });

  //variable para saber el valor de biz
  const biz = useWatch({ control, name: "biz" });

  //variables para saber los valores del departamento y la ciudad
  const state = useWatch({ control, name: "state" });
  const city = useWatch({ control, name: "city" });

  //variables para saber los valores de la direccion
  const [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10] = useWatch({
    control, name: [
      "dir_1", "dir_2", "dir_3", "dir_4", "dir_5",
      "dir_6", "dir_7", "dir_8", "dir_9", "dir_10",
    ]
  })

  //variables para saber el valor de latitude y longitude
  const lat = useWatch({ control, name: "latitude" });
  const lon = useWatch({ control, name: "longitude" });

  //variable para saber el valor de address 
  const address = useWatch({ control, name: "address" });

  //Funcion para mandar los elementos a Domus y luego Hubspot
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
  }

  //Funcion para actualizar la latitud y longitud desde el mapa
  const updateCoords = ({ lat, lon }: { lat: number; lon: number }) => {
    setValue("latitude", lat);
    setValue("longitude", lon);
  };

  const handleLocation = async (): Promise<void> => {

    if (!d1 || !d2 || !d7) {
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

  //Resetea los valores de saleprice y rent cada vez que se escoge un tipo de gestion
  useEffect(() => {
    if (biz === 1) {
      setValue("saleprice", "");
    }
    if (biz === 2) {
      setValue("rent", "");
    }
  }, [biz])

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
    d6, d7, d8, d9, d10, setValue])

  //Se utiliza para quitar los errores de tal manera que la notificacion desaparezca
  useEffect(() => {
    if (alert.show) {
      // Iniciar fade OUT después de 2.5s
      const fadeTimer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, fadeOut: true }));
      }, 2500);

      // Ocultar totalmente después de 3s
      const hideTimer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false, fadeOut: false }));
      }, 3000);

      return () => {
        clearTimeout(fadeTimer); clearTimeout(hideTimer);
      };
    }
  }, [alert.show]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="p-3">
        {/* Maneja los errores globales */}
        {alert.show && (
          <div className={`fixed top-1 -right-20 z-30 transition-all ease-in duration-500 ${alert.fadeOut ? "opacity-0 -right-20" : "opacity-100 right-1"}`}>
            <FormAlert
              destructive={alert.destructive}
              title={alert.title}
              description={alert.description}
            />
          </div>)}
        {/* Formulario */}
        <details className="details-base">
          <summary className="summary-base">Informacion Basica</summary>
          {/* Informacion administrativa */}
          
          <fieldset className="fieldset-base grid gap-3 grid-cols-2">
            <legend className="text-gray-500 px-2">Administrativo</legend>
            <FormField control={control} name="type" label="Tipo de inmueble" placeholder="Selecciona el tipo de inmueble" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Propiedades} />
            <FormField control={control} name="biz" label="Gestion" rules={{ required: "Este campo es obligatorio" }} component={Radio} options={Negocios} />
            <FormField control={control} name="destination" label="Destino" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Destinaciones} />
          </fieldset>
          {/* Descripcion base */}
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
          {/* Propietarios */}
          <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500 px-2">Propietarios</legend>
            <PropietariosField/>
          </fieldset>
          {/* Valores */}
          <fieldset className="fieldset-base flex flex-col md:flex-row gap-3">
            <legend className="text-gray-500 px-2">Valores</legend>
            <div className={`flex-col grow justify-center  ${biz == "" ? "hidden" : "flex gap-2"}`}>
              {(biz == 1 || biz == 3) &&
                <FormField control={control} name="rent" label="Valor Canon" placeholder="$ Valor Canon" rules={{ required: "Este campo es obligatorio" }} component={InputPrice} />
              }
              {(biz == 2 || biz == 3) &&
                <FormField control={control} name="saleprice" label="Valor Venta" placeholder="$ Valor Venta" rules={{ required: "Este campo es obligatorio" }} component={InputPrice} />
              }
            </div>
            <div className="flex flex-col grow ">
              <FormField control={control} name="administration" label="Valor Administración" placeholder="$ Valor Administración" rules={{}} component={InputPrice} />
            </div>
          </fieldset>
          {/* Descripcion y Comentarios */}
          <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500 px-2"> Descripcion y Comentarios</legend>
            <FormField control={control} name="description" label="Descripcion" rules={{ required: "Este campo es obligatorio", maxLength:{message:"Solo se pueden maximo 1500 caracteres",value:1500}}} component={TextArea} />
            <FormField control={control} name="comment" label="Comentarios" component={TextArea} />

          </fieldset>
        </details>
        <details className="details-base">
          <summary className="summary-base">Ubicación del inmueble</summary>
          {/* Localizacion general */}
          <fieldset className="fieldset-base">
            <legend className="text-gray-500">Direccion general</legend>
            <FormField control={control} name="country" label="Pais" placeholder="Pais" component={Select} options={[{ code: 1, name: "Colombia" }]} />
            <FormField control={control} name="state" label="Departamento" placeholder="Departamento" component={Select} options={Departamentos} />
            <FormField control={control} name="city" label="Ciudad" placeholder="Ciudad" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Ciudades.filter((c) => c.state_code == state)} />
            <FormField control={control} name="city_zone" label="Zona" placeholder="Zona" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Zonas.filter((z) => z.city_code == city)} />
            <FormField control={control} name="neighborhood_code" label="Barrio" placeholder="Barrio" rules={{ required: "Este campo es obligatorio" }} component={Select} options={Barrios.filter((b) => b.city_code == city)} />
          </fieldset>
          {/* Direccion especifica */}
          <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500">Dirección especifica</legend>
            <div className="flex flex-col lg:flex-row gap-3">
              {/* Via Principal */}
              <div className="flex flex-col justify-between">
                <label className="label-base">Via principal</label>
                <div className="grid grid-cols-3 gap-2 lg:flex">
                  <FormField control={control} name="dir_1" label="Tipo de via" placeholder="Tipo de via..." component={Select} options={Direccion_1} />
                  <FormField control={control} name="dir_2" label="Numeracion" component={InputNumber} />
                  <FormField control={control} name="dir_3" label="Letra" placeholder="Letra..." component={Select} options={Direccion_2} />
                  <FormField control={control} name="dir_4" label="Bis" placeholder="Bis..." component={Select} options={Direccion_3} />
                  <FormField control={control} name="dir_5" label="Letra de Bis" placeholder="Letra..." component={Select} options={Direccion_2} />
                  <FormField control={control} name="dir_6" label="Orientación" placeholder="Orientacion..." component={Select} options={Direccion_4} />
                </div>
              </div>
              {/* Via Secundaria */}
              <div className="flex flex-col justify-between">
                <label className="label-base"># Via Secundaria</label>
                <div className="grid grid-cols-2 gap-1">
                  <FormField control={control} name="dir_7" label="Numero" component={InputNumber} />
                  <FormField control={control} name="dir_8" label="Letra" placeholder="Letra..." component={Select} options={Direccion_2} />
                </div>
              </div>
              {/* Via complementaria */}
              <div className="flex flex-col justify-between">
                <label className="label-base">- Via Complemento</label>
                <div className="grid grid-cols-2 gap-1">
                  <FormField control={control} name="dir_9" label="Numero" component={InputNumber} />
                  <FormField control={control} name="dir_10" label="Orientación" placeholder="Orientación..." component={Select} options={Direccion_4} />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <FormField control={control} name="address" label="Direccion final" rules={{ required: "Este campo es obligatorio" }} component={InputText} componentProps={{ readonly: true, classname: "w-3/4" }} />
              <button type="button" className="button-base h-10 flex items-center text-sm" onClick={handleLocation}> Buscar direccion</button>
            </div>
            <Map lat={lat || 4.710989} lon={lon || -74.072090} setCoords={updateCoords} />
          </fieldset>
        </details>
        <details className="details-base">
          <summary className="summary-base">Amenidades / Caracteristicas</summary>
          <fieldset className="fieldset-base">
            <legend className="text-gray-500 px-2">Caracteristicas Interiores</legend>
          </fieldset>
          <fieldset className="fieldset-base">
            <legend className="text-gray-500 px-2">Caracteristicas exteriores</legend>
          </fieldset>
          <fieldset className="fieldset-base">
            <legend className="text-gray-500 px-2">Caracteristicas generales</legend>
          </fieldset>
        </details>
        <div className="fixed flex items-center gap-2 right-5 bottom-5 z-30">
          <button type="submit" className="order-2 size-14 border-2 border-secondary shadow-md bg-primary text-white rounded-full flex items-center justify-center peer z-80"><FaPaperPlane className="size-6" /></button>
          <p className="p-2 text-sm rounded-full order-1 transition-all ease-in duration-100 text-secondary bg-quaternary border-2  border-secondary opacity-0 peer-hover:opacity-100">Enviar inmueble</p>
        </div>
      </form>
    </div>
  )
}
