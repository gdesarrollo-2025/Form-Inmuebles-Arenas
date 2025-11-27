import { Direccion_1, Direccion_2, Direccion_3, Direccion_4 } from "@/constants/tipoDireccion";

import { Nomenclatura } from "@/constants/tipoDireccion";

import axios from "axios";

export interface LocatorResult {
  lat: number;
  lon: number;
}

export async function getCoords(address: string): Promise<LocatorResult> {
  console.log(address)
  console.log(encodeURIComponent(address))
  try {
    const res = await fetch(`/api/nominatim?q=${encodeURIComponent(address)}`);
    const data = await res.json();
    console.log(data)
    if (!Array.isArray(data) || data.length === 0) {
      return { lat: 0, lon: 0 };
    }

    return {
      lat: Number(data[0].lat),
      lon: Number(data[0].lon),
    };
  } catch (error) {
    console.error("❌ Error:", error);
    return { lat: 0, lon: 0 };
  }
}


export function getAddress(direccion: Nomenclatura): string {
  const { dir_1, dir_2, dir_3, dir_4, dir_5, dir_6, dir_7, dir_8, dir_9, dir_10 } = direccion;
  const p1 = dir_1 ? `${Direccion_1[dir_1 - 1]?.name || ""}` : "";
  const p2 = dir_2 ? ` ${dir_2}` : "";
  const p3 = dir_3 ? `${Direccion_2[dir_3 - 1]?.name || ""}` : "";
  const p4 = dir_4 ? ` ${Direccion_3[dir_4 - 1]?.name || ""}` : "";
  const p5 = dir_5 ? ` ${Direccion_2[dir_5 - 1]?.name || ""}` : "";

  const p6 = dir_6 ? ` ${Direccion_4[dir_6 - 1]?.name || ""}` : "";
  // Parte del número (#) 
  const p7 = dir_7 ? ` # ${dir_7}` : "";
  const p8 = dir_8 ? `${Direccion_2[dir_8 - 1]?.name || ""}` : "";
  const p9 = dir_9 ? ` - ${dir_9}` : "";
  const p10 = dir_10 ? ` ${Direccion_4[dir_10 - 1]?.name || ""}` : "";
  // Construimos concatenando solo lo que existe 
  return `${ p1 }${ p2 }${ p3 }${ p4 }${ p5 }${ p6 }${ p7 }${ p8 }${ p9 }${ p10 }`.trim();
};