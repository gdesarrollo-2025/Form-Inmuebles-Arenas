export interface Sucursal {
    code: number;
    name: string;
    city_code: number;
    city_name: string;
}


export const Sucursales: Sucursal[]=[
    {
        code: 590,
        name: "Grupo Arenas SAS Prado",
        city_code: 8001,
        city_name: "Barranquilla"
    },
    {
        code: 591,
        name: "Grupo Arenas SAS Corredores",
        city_code: 8001,
        city_name: "Barranquilla"
    },
    {
        code: 593,
        name: "Grupo Arenas SAS Barranquilla",
        city_code: 8001,
        city_name: "Barranquilla"
    },{
        code: 592,
        name: "Grupo Arenas SAS Cartagena",
        city_code: 13001,
        city_name: "Cartagena"
    },
]