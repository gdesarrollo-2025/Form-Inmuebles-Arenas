import { Propietario } from "@/types/propietario";

export async function getContactByNumber(phone: string): Promise<Propietario | undefined> {
    console.log(phone);
    try {
        const res = await fetch("/api/hubspot/get-contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: phone }),
        });

        const data = await res.json();  

        return {
            code: Number(data.hs_object_id),
            name: String(data.firstname),
            last_name: String(data.lastname),
            document_type: Number(data.document_type),
            document: Number(data.numero_de_identificacion),
            email: String(data.email),
            phone: [String(data.phone)],
        };
    } catch (error) {
        console.error("❌ Error:", error)
        return undefined;
    }
}
