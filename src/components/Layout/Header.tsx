import { FaBars } from "react-icons/fa"

export default function Header() {
    return (
        <header>
            <div className="flex  items-center justify-between border-2 h-20 shadow-lg rounded-b-lg px-5 py-2">
                <button className="button-base rounded-full"type="button"><FaBars/></button>
                <div>
                    LOGO
                </div>
                <div className="flex flex-col border-2 px-0 md:px-2 rounded-full justify-center items-center">
                    <p className="text-sm">Administrador</p>
                    <p className="text-xs w-2/3 md:w-full text-center text-balance">Grupo Arenas SAS Prado</p>
                </div>
            </div>
        </header>
    )
}