import { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Propietario } from "@/types/propietario";
import { getContactByNumber } from "@/lib/hubspot_conecction";
import { Documentos } from "@/types/propietario";
import { getContactByDocument } from "@/lib/domus_connection";
export default function PropietariosField() {
    const [busqueda, setBusqueda] = useState({
        docSearch: "",
        phoneSearch: "",
    })

    const [propietario, setPropietario] = useState<Propietario[]>([]);

    const phoneSearch = async () => {
        const result = await getContactByNumber(busqueda.phoneSearch)
        console.log(result)
        if (!result) return;
        setPropietario([result])
    }

    const docSearch = async () => {
        const result = await getContactByDocument(busqueda.docSearch ? Number(busqueda.docSearch) : 0)
        console.log(result)
        if (!result) return;
        setPropietario([result])
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBusqueda((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <fieldset className="fieldset-base flex flex-col gap-2">
            <legend className="text-gray-500 px-2">Propietarios</legend>
            <div className="flex flex-col gap-2 ">
                <div className="flex gap-2">
                    <div className="flex grow">
                        <input className="input-base" name="docSearch" type="text" value={busqueda.docSearch} placeholder="Busqueda por Documento (Domus)" onChange={handleInput} />
                        <div className="flex flex-col relative ">
                            <button type="button" onClick={docSearch} className="button-base rounded-r-full order-2 peer"><FaSearch /></button>
                            <p className="absolute p-2 gap-4 -top-10 -left-26  w-fit text-sm rounded-full order-1 transition-all ease-in duration-100 hidden text-secondary bg-quaternary border-2 border-secondary opacity-0 peer-hover:opacity-100 peer-hover:block">Buscar Propietario</p>
                        </div>
                    </div>
                    <div className="flex grow">
                        <input className="input-base" name="phoneSearch" type="text" value={busqueda.phoneSearch} placeholder="Busqueda por telefono (Hubspot)" onChange={handleInput} />
                        <div className="flex flex-col relative ">
                            <button type="button" onClick={phoneSearch} className="button-base rounded-r-full order-2 peer"><FaSearch /></button>
                            <p className="absolute p-2 gap-4 -top-10 -left-26  w-fit text-sm rounded-full order-1 transition-all ease-in duration-100 hidden text-secondary bg-quaternary border-2 border-secondary opacity-0 peer-hover:opacity-100 peer-hover:block">Buscar Propietario</p>
                        </div>
                    </div>
                    <div className="flex flex-col relative ">
                        <button type="button" className="button-base rounded-full order-2 peer"><FaPlus /></button>
                        <p className="absolute p-2 gap-4 -top-10 -left-26  w-fit text-sm rounded-full order-1 transition-all ease-in duration-100 hidden text-secondary bg-quaternary border-2 border-secondary opacity-0 peer-hover:opacity-100 peer-hover:block">Agregar Propietario</p>
                    </div>
                </div>

                <div className=" flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {propietario.map((p, idx) => (
                        <div key={idx} className="flex flex-col w-full  gap px-2 border-2 bg-primary border-secondary rounded-lg text-white">
                            <p className="text-white text-balance">{`${p.name} ${p.last_name}`}</p>
                            <div className="flex justify-between items-end">
                                <div className="flex flex-col items-start">
                                    <p><span className="text-white">{`${Documentos.find((d) => d.code == p.document_type)?.name}`}: </span>{p.document}</p>
                                    <p><span className="text-white">Tel: </span>{p.phone}</p>
                                </div>
                                <p className="text-blue-900">{p.code}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </fieldset>
    )
}