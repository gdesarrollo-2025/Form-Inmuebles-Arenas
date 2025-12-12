"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from "react";

interface AlertProps {
    destructive: boolean;
    title: string;
    description: string;
}


export interface StateAlert {
    show: boolean;
    destructive: boolean;
    title: string;
    description: string;
    fadeOut?: boolean;
}

interface AlertComponentProps {
    alert: StateAlert;
    setAlert: React.Dispatch<React.SetStateAction<StateAlert>>; // Component explicitly expects alert prop
}

export function FormAlert({ destructive, title, description }: AlertProps) {
    return (
        <div >
            {!destructive &&
                <Alert variant="default" >
                    <AlertTitle> {title}</AlertTitle>
                    <AlertDescription><p className=" text-justify text-balance w-40 md:w-80">{description}</p></AlertDescription>
                </Alert>}
            {destructive &&
                <Alert variant="destructive" >
                    <AlertTitle> {title}</AlertTitle>
                    <AlertDescription><p className=" text-justify text-balance w-40 md:w-80">{description}</p></AlertDescription>
                </Alert>}
        </div >
    )
}

export default function GlobalAlert({ alert, setAlert }: AlertComponentProps) {
    
    //Se utiliza para quitar los errores de tal manera que la notificacion desaparezca
    useEffect(() => {
        if (alert.show) {
            // Iniciar fade OUT después de 2.5s
            const fadeTimer = setTimeout(() => {
                setAlert((prev) => ({ ...prev, fadeOut: true }));
            }, 2500);

            // Ocultar totalmente después de 3s
            const hideTimer = setTimeout(() => {
                setAlert((prev) => ({ ...prev, show: false, fadeOut: false }));
            }, 3000);

            return () => {
                clearTimeout(fadeTimer); clearTimeout(hideTimer);
            };
        }
    }, [alert.show]);

    return (
        <div className={`fixed top-1 -right-20 z-30 transition-all ease-in duration-500 ${alert.fadeOut ? "opacity-0 -right-20" : "opacity-100 right-1"}`}>
            {alert.show && (
                <FormAlert
                    destructive={alert.destructive}
                    title={alert.title}
                    description={alert.description}
                />)}
        </div>
    )
}