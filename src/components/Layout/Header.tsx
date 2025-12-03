import { FaBars } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
export default function Header({toggleMenu}: {toggleMenu: () => void}) {
    return (
        <header>
            <div className="fixed bg-white z-30 flex items-center justify-between border-2 h-22 w-screen shadow-lg rounded-b-lg px-5 py-2">
                <button className="button-base rounded-full" onClick={toggleMenu}type="button"><FaBars/></button>
                <Link href="/">
                    <Image src="/LogoCompleto.webp" alt="Logo" width={200} height={65} className="object-contain" priority/>
                </Link>
                <div className="flex flex-col border-2 px-0 md:px-2 rounded-full justify-center items-center">
                    <p className="text-sm">Administrador</p>
                    <p className="text-xs w-2/3 md:w-full text-center text-balance">Grupo Arenas SAS Prado</p>
                </div>
            </div>
        </header>
    )
}