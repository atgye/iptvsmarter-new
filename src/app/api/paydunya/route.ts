import { NextResponse } from "next/server";

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
        name: "IPTV Smarters",
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

    const isTestMode = process.env.IS_PRODUCTION_MODE !== "true";
    
    // Si isTestMode est activé et qu'on a le paramètre mode "test", cela dépend de la configuration du compte PayDunya
    // Les clés test et live sont séparées sur Paydunya. On utilise directement l'API.

    const response = await fetch("https://app.paydunya.com/api/v1/checkout-invoice/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY || "",
        "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY || "",
        "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.response_code === "00") {
      return NextResponse.json({
        success: 1,
        token: data.token,
        redirect_url: data.url, // PayDunya return "url" not "redirect_url" but we map it here for our frontend compatibility
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
