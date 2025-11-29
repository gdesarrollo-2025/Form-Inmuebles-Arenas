export const Documentos = [
    {
        code: 1,
        name:"C.C."
    },
    {
        code: 5,
        nmae:"Nit"
    }
]

interface TelefonoDomus{
    type:number;
    tel_number: number;
}
interface Propiedad {
    code: number;
    share_percentage: number;
}

export interface Propietario {
    code?:number;
    name: string;
    last_name: string;
    document_type: number;
    document: number;
    email:string;
    phone:string[];
    city?: number;
    properties?: Propiedad[];
}


export interface PropietarioForm {
    code: number | "";
    name: string;
    last_name: string;
    document: number | "";
    email: string;
    city: number | "";
    properties: Propiedad[]
}