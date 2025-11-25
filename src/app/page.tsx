"use client";
import Form from "next/form";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { FaSearch, FaPlus, FaPaperPlane } from "react-icons/fa";

import { Propiedades } from "@/constants/tipoPropiedad";
import { Negocios } from "@/constants/tipoNegocio";
import { Destinaciones } from "@/constants/tipoDestinacion";
import { Estratos } from "@/constants/tipoEstrato";
import { initialInmueble } from "@/types/inmuebles";

import { getCoords, LocatorResult, getAddress } from "@/lib/locator";

import { Select } from "@/components/Select";
import { InputPrice, InputNumber } from "@/components/Input";
import { Inmueble } from "@/types/inmuebles";
import { Departamentos } from "@/constants/tipoDepartamento";
import { Ciudades } from "@/constants/tipoCiudad";
import { Zonas } from "@/constants/tipoZona";
import { Barrios } from "@/constants/tipoBarrio";
import { Direccion_1, Direccion_2, Direccion_3, Direccion_4 } from "@/constants/tipoDireccion";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface Coords {
  lat: number;
  lon: number;
}

export interface Nomenclatura {
  dir_1: number;
  dir_2: number;
  dir_3: number;
  dir_4: number;
  dir_5: number;
  dir_6: number;
  dir_7: number;
  dir_8: number;
  dir_9: number;
  dir_10: number;
}

interface Localizacion {
  country: string;
  state: number;
}


export default function Home() {
  const [inmueble, setInmueble] = useState<Inmueble>(initialInmueble)
  const [localizacion, setLocalizacion] = useState<Localizacion>({ country: "", state: 0 })
  const [direccion, setDireccion] = useState<Nomenclatura>({ dir_1: 0, dir_2: 0, dir_3: 0, dir_4: 0, dir_5: 0, dir_6: 0, dir_7: 0, dir_8: 0, dir_9: 0, dir_10: 0 })

  //Permite visualizar la direccion final segun los cambios en los selects
  useEffect(() => {
    setInmueble((prev) => ({ ...prev, ['address']: getAddress(direccion) }))
  }, [direccion])

  //Funcion para manejar los cambios en los params de inmueble
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    //en caso de ser la variable ciudad la que cambie debe resetear tanto el barrio como la zona sino solamente la variable con cambio
    if (name == 'city') {
      setInmueble((prev) => ({ ...prev, [name]: Number(value), ['neighborhood_code']: 0, ['city_zone']: 0 }));
    } else {
      setInmueble((prev) => ({ ...prev, [name]: Number(value) }));
    }

  }

  //Funcion para manejar los cambios en los inputs de precio como canon, administracion y venta
  const handlePriceChange = (name: string, value: number) => {
    setInmueble(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Funcion para manejar el cambio en los selects de las nomenclaturas/direccion especifica
  const handleDireccionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setDireccion((prev) => ({ ...prev, [name]: Number(value) }));
  };

  //Funcion para manejar el cambio en los selects para la localizacion/direccion general
  const handleLocalizacionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalizacion((prev) => ({ ...prev, [name]: Number(value), }))
    //en caso de cambiar la variable state debe de resetear ciudad, zona y barrio
    if (name == 'state') {
      setInmueble((prev) => ({ ...prev, ['city']: 0, ['neighborhood_code']: 0, ['city_zone']: 0 }))
    }
  }

  //funcion para manejar las coordenadas 
  const updateCoordinates = (newLat: number, newLon: number) => {
    setInmueble(prev => ({
      ...prev,
      latitude: newLat,
      longitude: newLon
    }));
  };

  const handleLocation = async (): Promise<void> => {
    const { lat, lon }: LocatorResult = await getCoords(
      `${inmueble.address}, ${Ciudades.find((c) =>  c.code==inmueble.city)?.name}, Colombia`
    );
    setInmueble((prev) => ({...prev, latitude:lat, longitude:lon}))
  };
  return (
    <div>
      <Form action={(e) => { console.log(inmueble) }} className="p-3 ">
        {/* Informacion basica */}
        <details className="details-base">
          <summary className="summary-base"> Informacion Basica </summary>
          {/* Informacion Necesaria para el inmueble */}
          <fieldset className="fieldset-base grid gap-3 grid-cols-2 lg:grid-cols-3">
            <legend className="text-gray-500">Administrativo</legend>
            <Select label="Tipo de Inmueble" name="type" placeholder="Tipo de inmueble" value={inmueble.type} options={Propiedades} required={true} toggleState={handleChange} />
            <div className=" flex flex-col group">
              <label className="label-base">Gestion:</label>
              <div className="flex flex-col md:flex-row gap-2">
                {Negocios.map((n) => (
                  <div key={n.code} className="radio-base">
                    <input type="radio" name="biz" value={n.code} required onChange={handleChange} /> <label>{n.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <Select label="Destinacion" name="destination" placeholder="Destino" value={inmueble.destination} options={Destinaciones} toggleState={handleChange} />
          </fieldset>
          {/* Descripcion base del inmueble */}
          <fieldset className="fieldset-base grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-3">
            <Select label="Estrato" name="stratum" placeholder="Estrato..." value={inmueble.stratum} options={Estratos} toggleState={handleChange} />
            <InputNumber label="Año Construido" name="built_year" value={inmueble.built_year} toggleState={handleChange} max={2025} />
            <InputNumber label="Niveles" name="level" value={inmueble.level} toggleState={handleChange} />
            <InputNumber label="Piso" name="floor" value={inmueble.floor} toggleState={handleChange} />
            <hr className="border-gray-400 border col-span-2 md:col-span-3 lg:col-span-4" />
            <InputNumber label="Habitaciones" name="bedrooms" value={inmueble.bedrooms} toggleState={handleChange} />
            <InputNumber label="Baños" name="bathrooms" value={inmueble.bathrooms} toggleState={handleChange} />
            <InputNumber label="Parqueaderos" name="parking" value={inmueble.parking} toggleState={handleChange} />
            <InputNumber label="Parqueaderos cubiertos" name="parking_covered" value={inmueble.parking_covered} toggleState={handleChange} />
            <hr className="border-gray-400 border col-span-2 md:col-span-3 lg:col-span-4" />
            <InputNumber label="Area lote M²" name="area_lot" step={"0.01"} value={inmueble.area_lot} toggleState={handleChange} />
            <InputNumber label="Area construida M²" name="area_cons" step={"0.01"} value={inmueble.area_cons} toggleState={handleChange} />
            <InputNumber label="Area privada M²" name="private_area" step={"0.01"} value={inmueble.private_area} toggleState={handleChange} />
          </fieldset>
          {/* Propietario y su porcentaje */}
          <fieldset className="fieldset-base">
          </fieldset>
          {/* Valores */}
          <fieldset className="fieldset-base flex flex-col md:flex-row gap-3">
            <legend className="text-gray-500">Valores</legend>
            <div className="flex flex-col grow justify-center">
              {(inmueble.biz == 1 || inmueble.biz == 3) &&
                <InputPrice label="Canon" name="rent" value={inmueble.rent} placeholder="$ Valor Canon" toggleState={handlePriceChange} />
              }
              {(inmueble.biz == 2 || inmueble.biz == 3) &&
                <InputPrice label="Venta" name="saleprice" value={inmueble.saleprice} placeholder="$ Valor Venta" toggleState={handlePriceChange} />
              }
            </div>
            <div className="flex flex-col grow group">
              <InputPrice label="Administración" name="administration" value={inmueble.administration} placeholder="$ Valor Administración" toggleState={handlePriceChange} />
            </div>
          </fieldset>
        </details>
        {/* Ubicación */}
        <details className="details-base">
          <summary className="summary-base"> Ubicación del inmueble</summary>
          {/* Localización general */}
          <fieldset className="fieldset-base">
            <legend className="text-gray-500">Dirección general</legend>
            <Select label="Pais" name="country" placeholder="Pais..." value={localizacion.country} options={[{ code: 1, name: "Colombia" }]} toggleState={handleLocalizacionChange} />
            <Select label="Departamento" name="state" placeholder="Departamento" value={localizacion.state} options={Departamentos} toggleState={handleLocalizacionChange} />
            <Select label="Ciudad" name="city" placeholder="Ciudad" value={inmueble.city} options={Ciudades.filter((c) => c.state_code == localizacion.state)} toggleState={handleChange} />
            <Select label="Zona" name="city_zone" placeholder="Zona" value={inmueble.city_zone} options={Zonas.filter((z) => z.city_code == inmueble.city)} toggleState={handleChange} />
            <Select label="Barrio" name="neighborhood_code" placeholder="Barrio" value={inmueble.neighborhood_code} options={Barrios.filter((b) => b.city_code == inmueble.city)} toggleState={handleChange} />
          </fieldset>
          <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500">Direccion Especifica</legend>
            {/* Selects para la direccion especifica */}
            <div className="flex flex-col lg:flex-row  gap-3 ">
              {/* Via Principal */}
              <div className="flex flex-col group">
                <label className="label-base">Via principal</label>
                <div className="grid grid-cols-3 lg:flex ">
                  <Select label="" name="dir_1" placeholder="" value={direccion.dir_1} options={Direccion_1} toggleState={handleDireccionChange} />
                  <InputNumber label="" name="dir_2" value={direccion.dir_2} toggleState={handleDireccionChange} />
                  <Select label="" name="dir_3" placeholder="" value={direccion.dir_3} options={Direccion_2} toggleState={handleDireccionChange} />
                  <Select label="" name="dir_4" placeholder="" value={direccion.dir_4} options={Direccion_3} toggleState={handleDireccionChange} />
                  <Select label="" name="dir_5" placeholder="" value={direccion.dir_5} options={Direccion_2} toggleState={handleDireccionChange} />
                  <Select label="" name="dir_6" placeholder="" value={direccion.dir_6} options={Direccion_4} toggleState={handleDireccionChange} />
                </div>
              </div>
              {/* Via Secundaria */}
              <div className="flex flex-col group ">
                <label className="label-base"># Via Secundaria</label>
                <div className="grid grid-cols-2">
                  <InputNumber label="" name="dir_7" value={direccion.dir_7} toggleState={handleDireccionChange} />
                  <Select label="" name="dir_8" placeholder="" value={direccion.dir_8} options={Direccion_2} toggleState={handleDireccionChange} />
                </div>
              </div>
              {/* Via Complemento */}
              <div className="flex flex-col group">
                <label className="label-base">- Via Complemento</label>
                <div className="grid grid-cols-2">
                  <InputNumber label="" name="dir_9" value={direccion.dir_9} toggleState={handleDireccionChange} />
                  <Select label="" name="dir_10" placeholder="" value={direccion.dir_10} options={Direccion_4} toggleState={handleDireccionChange} />
                </div>
              </div>
            </div>
            {/* Mapa y ubicacion */}
            <div className="flex justify-between">
              <label> Direccion Final: {inmueble.address}</label>
              <button type="button" className="button-base" onClick={handleLocation}> Buscar dirección</button>
            </div>
            <Map lat={inmueble.latitude} lon={inmueble.longitude} setCoords={({ lat, lon }) => updateCoordinates(lat, lon)} />
          </fieldset>

        </details>
        {/* Boton para enviar el formulario */}
        <div className="fixed flex items-center gap-2 right-5 bottom-5 z-30">
          <button type="submit" className="order-2 size-14 border-2 border-blue-400 shadow-md bg-primary text-white rounded-full flex items-center justify-center peer z-80"><FaPaperPlane className="size-6" /></button>
          <p className="p-2 text-sm rounded-full order-1 text-blue-400 bg-blue-100 border-2 border-blue-200 hidden opacity-0 peer-hover:opacity-100 peer-hover:block transition-all">Enviar inmueble</p>
        </div>
      </Form>
    </div>
  );
}
