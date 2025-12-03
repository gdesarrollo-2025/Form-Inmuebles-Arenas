import { FaHouseUser, FaUsers } from "react-icons/fa"
import Link from "next/link";

export default function SideBar({ menu }: { menu?: boolean }) {
    return (
        <div
            className={`
       fixed bg-white flex flex-col items-center justify-center gap-3 w-44 border-2 rounded-lg z-30
      transition-all duration-300 overflow-hidden
      ${menu ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}
    `}
        >
            <Link className="text-primary flex items-center gap-2 text-lg px-2 hover:text-terciary active:text-primary" href="/properties">
                <FaHouseUser /> Propiedades
            </Link>

            <Link className="text-primary flex items-center gap-2 text-lg px-2 hover:text-terciary active:text-primary" href="/owners">
                <FaUsers /> Propietarios
            </Link>
        </div>
    )
}