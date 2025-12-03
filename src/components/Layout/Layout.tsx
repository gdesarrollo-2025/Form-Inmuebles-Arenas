'use client'
import Header from "./Header";
import SideBar from "./SideBar";
import { useState } from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [menu, setMenu] = useState(false)

    const toggleMenu = () => {
        setMenu(!menu)
    }

    return (
        <div>
            <Header toggleMenu={toggleMenu}/>
            <div className=" pt-22 relative flex h-full">
                <SideBar menu={menu}/>
                {children}
            </div>
        </div>
    )
}