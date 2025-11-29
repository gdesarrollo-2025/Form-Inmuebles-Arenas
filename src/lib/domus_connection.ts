import { Propietario } from "@/types/propietario";

function format(name:string){
    return name
    .toLowerCase()
    .trim()
    .split(/\s+/) // separa espacios múltiples
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}
export async function getContactByDocument (document: number): Promise<Propietario | undefined> {
    console.log(document);
    try{
        const res = await fetch(`/api/domus/get-contact?document=${document}`)

        if(!res.ok) return undefined;
        const response = await res.json()

        return {
            name: format(response[0].name),
            last_name: format(response[0].last_name),
            document_type: Number(response[0].document_type == "Cedula" ? 1 : 5),
            document: Number(response[0].document),
            email: response[0].email,
            phone: [String(response[0].phones[0].number.replace(" ", ""))]
        }
    }catch(error){
        console.error("❌ Error:", error);
        return undefined;
    }
}