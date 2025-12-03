import PropertieCard from "@/components/Properties/PropertieCard";
import Image from "next/image";
import {FaPlus} from "react-icons/fa";

export default function PropertiesPage() {
    return (
        <div className=" m-3 border-2 border-gray-300 rounded-lg w-full flex flex-col divide-y divide-gray-400">
            <div className="px-2 grid grid-cols-10 divide-x-2 divide-gray-300 gap-2">
                <p className="col-span-3 md:col-span-1">Codigo</p>
                <p className="col-span-5 md:col-span-8">Inmueble</p>
                <p>Accion</p>
            </div>
            <PropertieCard />
            <div className="fixed flex items-center gap-2 right-5 bottom-5 z-30">
                <button type="button" className="order-2 size-14 border-2 border-secondary shadow-md bg-primary text-white rounded-full flex items-center justify-center peer z-80"><FaPlus className="size-6" /></button>
                <p className="p-2 text-sm rounded-full order-1 transition-all ease-in duration-100 text-secondary bg-quaternary border-2  border-secondary opacity-0 peer-hover:opacity-100">Crear inmueble</p>
            </div>
        </div>
    )
}

//modelo diferente para md: