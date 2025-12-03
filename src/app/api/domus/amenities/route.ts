import { NextResponse } from "next/server";

const DOMUS_URL = `${process.env.PROD_API_DOMUS}/general/amenities`;
const DOMUS_TOKEN = process.env.DOMUS_TOKEN

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const type = searchParams.get("type");
        console.log("Received type:", type);
        if (!type) {
            return NextResponse.json({ error: "Missing type parameter" }, { status: 400 });
        }
        
        // Crear URL con el parámetro
        const url = `${DOMUS_URL}?type=${type}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: DOMUS_TOKEN || "",
                "Content-Type": "application/json",
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