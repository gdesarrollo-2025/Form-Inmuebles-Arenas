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
            <Header />
            <div className="relative flex h-screen">
                <SideBar />
                {children}
            </div>
        </div>
    )
}