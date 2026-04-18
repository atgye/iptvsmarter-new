import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

// Helper function to save order to a local JSON file
function saveOrder(ref_command: string, custom_field: any) {
  try {
    const filePath = path.resolve(process.cwd(), "orders.json");
    let orders = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      orders = JSON.parse(fileData);
    }

    const orderIndex = orders.findIndex((o: any) => o.ref_command === ref_command);
    if (orderIndex >= 0) {
      orders[orderIndex].status = "PAID";
      orders[orderIndex].updatedAt = new Date().toISOString();
    } else {
      orders.push({
        ref_command,
        custom_field,
        status: "PAID",
        createdAt: new Date().toISOString(),
      });
    }

    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf-8");
  } catch (error) {
    console.error("Could not save order:", error);
  }
}

export async function POST(request: Request) {
  try {
    // PayDunya callback sends data payload via POST. 
    // We can extract data.data.hash and token from the JSON body or url-encoded form.
    // Try both:
    let bodyData: any;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      bodyData = await request.json();
    } else {
      const formData = await request.formData();
      // Sometimes it's a "data" stringified property
      const dataField = formData.get("data");
      if (dataField) {
        bodyData = JSON.parse(dataField as string);
      } else {
        // Build an object out of formData keys
        bodyData = Object.fromEntries(formData.entries());
      }
    }

    // Usually the payload is wrapped in a "data" object.
    const payload = bodyData.data || bodyData;
    const hash = payload.hash;
    const response_code = payload.response_code;
    const invoiceToken = payload.invoice?.token;

    // Secure Verification Check using the "MasterKey" as per PayDunya docs
    // The hash might be generated securely, but the recommended highly-secure method
    // is to fetch the transaction details again from PayDunya API using the invoice token:
    if (!invoiceToken) {
      console.warn("No invoice token found in IPN payload.");
      return new NextResponse("IPN Invalid structure", { status: 400 });
    }

    const verifyResponse = await fetch(`https://app.paydunya.com/api/v1/checkout-invoice/confirm/${invoiceToken}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY || "",
        "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY || "",
        "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN || "",
      },
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.response_code === "00" && verifyData.status === "completed") {
      // Payment Verified!
      const custom_data = verifyData.custom_data || {};
      const ref_command = custom_data.ref_command;
      let parsedCustomField = {};

      try {
        if (custom_data.custom_field) {
          parsedCustomField = JSON.parse(custom_data.custom_field);
        }
      } catch (e) {}

      if (ref_command) {
        saveOrder(ref_command, parsedCustomField);
      }

      return new NextResponse("IPN OK", { status: 200 });
    } else {
      console.warn("IPN Verification Failed or payment not completed.", verifyData);
      return new NextResponse("IPN Verification Failed", { status: 400 });
    }
  } catch (error) {
    console.error("IPN Error:", error);
    return new NextResponse("IPN Error", { status: 500 });
  }
}
