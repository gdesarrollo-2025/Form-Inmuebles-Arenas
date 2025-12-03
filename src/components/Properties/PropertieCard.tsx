import Image from "next/image";

export default function PropertieCard() {
    return (
        <div className="px-2 grid grid-cols-10 divide-x-2 divide-gray-300 gap-2">
            <p className="content-center col-span-3 md:col-span-1">123456</p>
            <div className="relative flex flex-col md:flex-row col-span-5 md:col-span-8">
                <div className="relative w-full md:w-36 h-24">
                    <Image src={"/Logo.webp"} alt="Imagen" fill className="object-contain" sizes={""}/>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col md:flex-row md:gap-3">
                        <p><span className="text-terciary">Tipo: </span>Apartamento</p>
                        <p><span className="text-terciary">Direccion: </span>Calle 123 #45-67</p>
                        <p><span className="text-terciary">Barrio: </span> Prado</p>
                    </div>
                    <p className="text-sm p-1 border-2 border-secondary w-fit bg-quaternary rounded-full ">Propietario</p>
                    <div className="text-sm flex gap-2 md:flex-row md:gap-3">
                        <p className="p-1 border-2 w-fit border-green-500 bg-green-200 rounded-full "> Agente Captador</p>
                        <p className="p-1 border-2 w-fit border-blue-500 bg-blue-200 rounded-full "> Agente Promotor</p>
                    </div>
                </div>
            </div>
            <p className="content-center">Editar</p>
        </div>
    )
}