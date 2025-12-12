import { Propietario } from "@/types/propietario";
import { Asesor } from "@/constants/tipoAsesor";
import { Amenidad } from "@/constants/tipoAmenidades";
import { Ciudad } from "@/constants/tipoCiudad";

function format(name: string) {
    return name
        .toLowerCase()
        .trim()
        .split(/\s+/) // separa espacios múltiples
        .map(
            word => word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}

export async function getContactByDocument(document: string): Promise<Propietario | undefined> {
    console.log("documento entra en la funcion de domus",document)
    console.log
    try {
        const res = await fetch(`/api/domus/owners?document=${document}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return undefined;
        const response = await res.json()
        console.log(response)

        return {
            name: format(response[0].name),
            last_name: format(response[0].last_name),
            document_type: Number(response[0].document_type == "Cedula" ? 1 : 5),
            document: Number(response[0].document),
            email: response[0].email,
            phones: [response[0].phones]
        }
    } catch (error) {
        console.error("❌ Error:", error);
        return undefined;
    }
}

export async function getContactByPhone(phone: string): Promise<Propietario | undefined> {
    try {
        const res = await fetch(`/api/domus/owners?phone=${phone}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return undefined;
        const response = await res.json()

        return {
            name: format(response[0].name),
            last_name: format(response[0].last_name),
            document_type: Number(response[0].document_type == "Cedula" ? 1 : 5),
            document: Number(response[0].document),
            email: response[0].email,
            phones: [response[0].phones]
        }
    } catch (error) {
        console.error("❌ Error:", error);
        return undefined;
    }
}
export async function getBrokers(): Promise<Asesor[]> {
    try {

        const res = await fetch(`/api/domus/brokers`);

        if (!res.ok) return [];
        const response = await res.json();
        return response.filter((r: any) => r.name).map((b: any) => {
            return {
                code: b.code,
                name: `${format(b.name)} ${format(b.last_name)}`,
                city: b.city,
                email: b.email
            }
        });
    } catch (error) {
        console.error("❌ Error:", error);
        return []
    }
}

export async function getAmenities(type: number): Promise<Amenidad[]> {
    if (!type) {
        console.warn("⚠️ Tipo de amenidad no proporcionado");
        return [];
    }

    try {
        const res = await fetch(`/api/domus/amenities?type=${type}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return [];

        const response = await res.json();

        return response;
    } catch (error) {
        console.error("❌ Error:", error);
        return []
    }
}

export async function getCities(): Promise<Ciudad[]> {
    try {
        const res = await fetch(`/api/domus/cities`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return [];

        const response = await res.json();
        return response
    } catch (error) {
        console.error("❌ Error:", error)
        return []
    }
}