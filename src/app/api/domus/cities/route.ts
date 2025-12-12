import { NextResponse } from "next/server";

const DOMUS_URL = `${process.env.PROD_API_DOMUS}/general/cities`;
const DOMUS_TOKEN = process.env.DOMUS_TOKEN

export async function GET() {
    try {
        // Crear URL con el parámetro
        const url = `${DOMUS_URL}`;
        
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: DOMUS_TOKEN || "",
                "Content-Type": "application/json",
                "inmobiliaria": "1",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json(
                { error: data?.message || "Domus request failed" },
                { status: response.status }
            );
        }

        return NextResponse.json(data.data, { status: 200 });
    } catch (error) {
        console.error("Domus error:", error)
        return NextResponse.json(
            { error: "Internal Server error" },
            { status: 500 }
        )
    }
}