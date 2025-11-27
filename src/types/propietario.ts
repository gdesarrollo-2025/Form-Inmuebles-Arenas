interface Telefono{
    type:number;
    tel_number: number;
}
interface Propiedad {
    code: number;
    share_percentage: number;
}

export interface Propietario {
    name: string;
    last_name: string;
    document_type: number;
    document: number;
    email:string;
    city?: number;
    properties?: Propiedad[];
}


export interface PropietarioForm {
    name: string;
    last_name: string;
    document: number | "";
    email: string;
    city: number | "";
    properties: Propiedad[]
}