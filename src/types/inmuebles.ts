import {Amenidad} from "@/constants/tipoAmenidades";

export type Inmueble = {
    codpro?: number,
    city: number,
    address: string,
    latitude: number,
    longitude: number,
    city_zone: number,
    biz:number,
    stratum: number,
    type: number,
    neighborhood_code: number,
    area_cons: number,
    area_lot: number,
    private_area?: number,
    built_year?: number,
    destination: number,
    level?: number,
    floor?: number,
    bathrooms?: number,
    bedrooms?: number,
    parking?: number,
    parking_covered?: number,
    rent?: number,
    saleprice?: number,
    administration?: number,
    description: string,
    description_portals: string,
    comment: string,
    comment_2: string,
    status: number,
    promoter_broker: number,
    catcher_broker: number,
    amenities: Amenidad[] ,
    rental_premise_value?: number,
}

export type InmuebleForm ={
  city: number | "";
  address: string;
  latitude: number ;
  longitude: number ;
  city_zone: number | "";
  biz: number | "";
  stratum: number | "";
  type: number | "";
  neighborhood_code: number | "";
  area_cons: number | "";
  area_lot: number | "";
  private_area: number | "";
  built_year: number | "";
  destination: number | "";
  level: number | "";
  floor: number | "";
  bathrooms: number | "";
  bedrooms: number | "";
  parking: number | "";
  parking_covered: number | "";
  rent: number | "";
  saleprice: number | "";
  administration: number | "";
  description: string;
  description_portals: string;
  comment: string;
  comment_2: string;
  status: number | "";
  promoter_broker: number | "";
  catcher_broker: number | "";
  amenities: Amenidad[];
  rental_premise_value?: number | "";
  //localizacion
  country: number | "";
  state: number | "";
  //direccion
  dir_1: number | "";
  dir_2: number | "";
  dir_3: number | "";
  dir_4: number | "";
  dir_5: number | "";
  dir_6: number | "";
  dir_7: number | "";
  dir_8: number | "";
  dir_9: number | "";
  dir_10: number | "";
  //propietario
  
}
export const initialInmueble: InmuebleForm = {
  city: "",
  address: "",
  latitude: 0,
  longitude: 0,
  city_zone: "",
  biz: "",
  stratum: "",
  type: "",
  neighborhood_code: "",
  area_cons: "",
  area_lot: "",
  private_area: "",
  built_year: "",
  destination: "",
  level: "",
  floor: "",
  bathrooms: "",
  bedrooms: "",
  parking: "",
  parking_covered: "",
  rent: "",
  saleprice: "",
  administration: "",
  description: "",
  description_portals: "",
  comment: "",
  comment_2: "",
  status: 1, 
  promoter_broker: "",
  catcher_broker: "",
  amenities: [],
  rental_premise_value: "",
  //localizacion
  country: "",
  state: "",
  //direccion
  dir_1: "",
  dir_2: "",
  dir_3: "",
  dir_4: "",
  dir_5: "",
  dir_6: "",
  dir_7: "",
  dir_8: "",
  dir_9: "",
  dir_10: "",
};
