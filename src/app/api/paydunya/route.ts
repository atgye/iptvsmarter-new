import { NextResponse } from "next/server";

const PAYDUNYA_BASE_URL = process.env.IS_PRODUCTION_MODE === "true"
  ? "https://app.paydunya.com/api/v1"
  : "https://app.paydunya.com/sandbox-api/v1";

function getPaydunyaHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY || "",
    "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY || "",
    "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN || "",
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { item_name, item_price, ref_command, custom_field } = body;

    const returnUrl = process.env.PAYDUNYA_RETURN_URL || "http://localhost:3000/paiement/success";
    const cancelUrl = process.env.PAYDUNYA_CANCEL_URL || "http://localhost:3000/paiement/annule";
    const callbackUrl = process.env.PAYDUNYA_CALLBACK_URL || "http://localhost:3000/api/paydunya/ipn";

    const payload = {
      invoice: {
        total_amount: item_price,
        description: item_name,
      },
      store: {
        name: "SunuStream",
      },
      custom_data: {
        ref_command: ref_command,
        custom_field: JSON.stringify(custom_field || {}),
      },
      actions: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
        callback_url: callbackUrl,
      },
    };

    const response = await fetch(`${PAYDUNYA_BASE_URL}/checkout-invoice/create`, {
      method: "POST",
      headers: getPaydunyaHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.response_code === "00") {
      return NextResponse.json({
        success: 1,
        token: data.token,
        redirect_url: data.url, 
      });
    } else {
      return NextResponse.json(
        { success: 0, error: data.response_text || "Erreur PayDunya" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayDunya API Error:", error);
    return NextResponse.json(
      { success: 0, error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ status: "error", error: "Missing token" }, { status: 400 });
    }

    const verifyResponse = await fetch(`${PAYDUNYA_BASE_URL}/checkout-invoice/confirm/${token}`, {
      method: "GET",
      headers: getPaydunyaHeaders(),
    });

    const verifyData = await verifyResponse.json();
    return NextResponse.json(verifyData);
  } catch (error) {
    console.error("PayDunya Verify Error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}