import { NextResponse } from "next/server";

const PAYDUNYA_BASE_URL = process.env.IS_PRODUCTION_MODE === "true"
  ? "https://app.paydunya.com/api/v1"
  : "https://app.paydunya.com/sandbox-api/v1";

function getPaydunyaHeaders() {
  return {
    Accept: "application/json",
    "PAYDUNYA-MASTER-KEY":  process.env.PAYDUNYA_MASTER_KEY  || "",
    "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY || "",
    "PAYDUNYA-PUBLIC-KEY":  process.env.PAYDUNYA_PUBLIC_KEY  || "",
    "PAYDUNYA-TOKEN":       process.env.PAYDUNYA_TOKEN       || "",
  };
}

/**
 * POST /api/paydunya/ipn
 *
 * PayDunya envoie une notification IPN après chaque paiement.
 * On re-vérifie systématiquement le statut via l'API (ne jamais
 * faire confiance au payload IPN seul — toujours confirmer côté serveur).
 */
export async function POST(request: Request) {
  try {
    let bodyData: Record<string, unknown> = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      bodyData = await request.json();
    } else {
      const formData = await request.formData();
      const dataField = formData.get("data");
      if (dataField) {
        bodyData = JSON.parse(dataField as string);
      } else {
        bodyData = Object.fromEntries(formData.entries()) as Record<string, unknown>;
      }
    }

    // Le payload peut être imbriqué dans un champ "data"
    const payload = (bodyData.data as Record<string, unknown>) || bodyData;
    const invoiceToken = (payload.invoice as Record<string, unknown>)?.token as string | undefined;

    if (!invoiceToken) {
      console.warn("[IPN] Payload reçu sans token de facture :", JSON.stringify(bodyData));
      return new NextResponse("IPN structure invalide", { status: 400 });
    }

    // ✅ Vérification côté serveur — la seule méthode fiable
    const verifyResponse = await fetch(
      `${PAYDUNYA_BASE_URL}/checkout-invoice/confirm/${invoiceToken}`,
      { method: "GET", headers: getPaydunyaHeaders() }
    );

    const verifyData = await verifyResponse.json();

    if (verifyData.response_code !== "00") {
      console.warn("[IPN] Échec de vérification PayDunya :", verifyData);
      return new NextResponse("Vérification échouée", { status: 400 });
    }

    const status = verifyData.status as string; // "completed" | "pending" | "canceled" | "fail"

    if (status !== "completed") {
      console.log(`[IPN] Paiement non complété — statut : ${status} — token : ${invoiceToken}`);
      // On retourne 200 pour que PayDunya ne retry pas — mais on ne traite pas
      return new NextResponse("OK (non complété)", { status: 200 });
    }

    // ── Paiement confirmé : traiter la commande ──────────────────────────────
    const customData   = verifyData.custom_data || {};
    const refCommand   = customData.ref_command as string | undefined;
    const totalAmount  = verifyData.invoice?.total_amount as number | undefined;
    const customer     = verifyData.customer as { name?: string; phone?: string; email?: string } | undefined;

    let customField: Record<string, unknown> = {};
    try {
      if (customData.custom_field) {
        customField = JSON.parse(customData.custom_field as string);
      }
    } catch {
      // custom_field peut déjà être un objet
      customField = (customData.custom_field as Record<string, unknown>) || {};
    }

    console.log("[IPN] ✅ Paiement confirmé :", {
      token:      invoiceToken,
      ref:        refCommand,
      amount:     totalAmount,
      customer,
      items:      customField,
    });

    // TODO: Persister la commande en base de données ici.
    // Exemple avec Prisma :
    //   await prisma.order.upsert({
    //     where:  { refCommand },
    //     update: { status: "PAID", updatedAt: new Date() },
    //     create: { refCommand, items: customField, amount: totalAmount, status: "PAID" },
    //   });

    return new NextResponse("IPN OK", { status: 200 });
  } catch (error) {
    console.error("[IPN] Erreur :", error);
    return new NextResponse("Erreur serveur IPN", { status: 500 });
  }
}
