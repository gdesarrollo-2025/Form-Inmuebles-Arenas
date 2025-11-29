import { NextResponse } from "next/server";

const HUBSPOT_URL = `${process.env.API_HUBSPOT}crm/v3/objects/contacts/search`;
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN; // usa variable de entorno SIEMPRE

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Missing phone number." },
        { status: 400 }
      );
    }

    const response = await fetch(HUBSPOT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: phone,
        limit: 100,
        properties: [
          "phone",
          "firstname",
          "lastname",
          "email",
          "numero_de_identificacion",
          "document_type",
        ],
      }),
    });

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { message: "No contacts found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data.results[0].properties, { status: 200 });

  } catch (error) {
    console.error("HubSpot error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
