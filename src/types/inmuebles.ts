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
  codpro?: number | "";
  city: number | "";
  address: string;
  latitude: number | "";
  longitude: number | "";
  city_zone: number | "";
  biz: number | "";
  stratum: number | "";
  type: number | "";
  neighborhood_code: number | "";
  area_cons: number | "";
  area_lot: number | "";
  private_area?: number | "";
  built_year?: number | "";
  destination: number | "";
  level?: number | "";
  floor?: number | "";
  bathrooms?: number | "";
  bedrooms?: number | "";
  parking?: number | "";
  parking_covered?: number | "";
  rent?: number | "";
  saleprice?: number | "";
  administration?: number | "";
  description: string;
  description_portals: string;
  comment: string;
  comment_2: string;
  status: number | "";
  promoter_broker: number | "";
  catcher_broker: number | "";
  amenities: Amenidad[];
  rental_premise_value?: number | "";
}
export const initialInmueble: Inmueble = {
  codpro: 0,
  city: 0,
  address: "",
  latitude: 0,
  longitude: 0,
  city_zone: 0,
  biz: 0,
  stratum: 0,
  type: 0,
  neighborhood_code: 0,
  area_cons: 0,
  area_lot: 0,
  private_area: 0,
  built_year: 0,
  destination: 0,
  level: 0,
  floor: 0,
  bathrooms: 0,
  bedrooms: 0,
  parking: 0,
  parking_covered: 0,
  rent: 0,
  saleprice: 0,
  administration: 0,
  description: "",
  description_portals: "",
  comment: "",
  comment_2: "",
  status: 1, 
  promoter_broker: 0,
  catcher_broker: 0,
  amenities: [],
  rental_premise_value: 0,
};
