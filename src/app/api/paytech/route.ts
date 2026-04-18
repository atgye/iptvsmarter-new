import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { item_name, item_price, ref_command, custom_field } = body;

    const payload = {
      item_name,
      item_price,
      command_name: `Commande ${ref_command}`,
      ref_command,
      env: process.env.IS_PRODUCTION_MODE === "true" ? "production" : "test",
      currency: "XOF",
      ipn_url: process.env.PAYTECH_IPN_URL,
      success_url: process.env.PAYTECH_SUCCESS_URL,
      cancel_url: process.env.PAYTECH_CANCEL_URL,
      custom_field: JSON.stringify(custom_field || {}),
    };

    const response = await fetch("https://paytech.sn/api/payment/request-payment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        API_KEY: process.env.PAYTECH_API_KEY || "",
        API_SECRET: process.env.PAYTECH_API_SECRET || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.success === 1 || data.success === true) {
      return NextResponse.json({
        success: 1,
        token: data.token,
        redirect_url: data.redirect_url,
      });
    } else {
      return NextResponse.json(
        { success: 0, error: data.errors || "Erreur PayTech" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("PayTech API Error:", error);
    return NextResponse.json(
      { success: 0, error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
