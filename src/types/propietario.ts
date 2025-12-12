export const Documentos = [
    {
        code: 1,
        name: "Cedula"
    },
    {
        code: 5,
        name: "Nit"
    }
]

export const Telefonos = [
    {
        code: 1,
        name: "Casa"
    },
    {
        code: 2,
        name: "Oficina"
    },
    {
        code: 5,
        name: "Otro"
    }
]

export interface TelefonoDomus {
    type: number|"";
    phone: number|"";
}

export interface Propiedad {
    code: number;
    share_percentage: number;
}

export interface Propietario {
    code?: number;
    name: string;
    last_name: string;
    document_type: number;
    document: number;
    email: string;
    phones: TelefonoDomus[];
    city?: number;
    neighborhood?: string;
    broker?: number;
    branch?: number;
    properties?: Propiedad[];
}


export interface PropietarioForm {
    code: number | "";
    name: string;
    last_name: string;
    document_type: number | "";
    document: number | "";
    email: string;
    phones: TelefonoDomus[];
    city: number | "";
    neighborhood: string;
    broker: number | "";
    branch: number | "";
    properties: Propiedad[];
    
}

export const InitialPropietario: PropietarioForm = {
    code: "",
    name: "",
    last_name: "",
    document_type: "",
    document: "",
    email: "",
    city: "",
    neighborhood: "",
    broker:"",
    branch:"",
    properties: [],
    phones: [{type:"", phone:""}]
}