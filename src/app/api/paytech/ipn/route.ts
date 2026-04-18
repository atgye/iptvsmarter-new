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
    // Paytech sends data as form-urlencoded in the body for IPN
    const formData = await request.formData();
    const type_event = formData.get("type_event");
    const custom_field = formData.get("custom_field");
    const ref_command = formData.get("ref_command");
    const item_name = formData.get("item_name");
    const item_price = formData.get("item_price");
    const devis = formData.get("devis");
    const command_name = formData.get("command_name");
    const env = formData.get("env");
    const token = formData.get("token");
    const api_key_sha256 = formData.get("api_key_sha256");
    const api_secret_sha256 = formData.get("api_secret_sha256");

    const my_api_key = process.env.PAYTECH_API_KEY || "";
    const my_api_secret = process.env.PAYTECH_API_SECRET || "";

    const my_api_key_sha256 = crypto
      .createHash("sha256")
      .update(my_api_key)
      .digest("hex");
    const my_api_secret_sha256 = crypto
      .createHash("sha256")
      .update(my_api_secret)
      .digest("hex");

    if (
      my_api_key_sha256 === api_key_sha256 &&
      my_api_secret_sha256 === api_secret_sha256
    ) {
      if (type_event === "sale_complete") {
        // Validation succeeded
        let parsedCustomField = {};
        try {
          if (custom_field) {
             parsedCustomField = JSON.parse(custom_field.toString());
          }
        } catch (e) {}

        saveOrder(ref_command as string, parsedCustomField);
        
        // Return exactly this string for Paytech
        return new NextResponse("IPN OK", { status: 200 });
      } else {
        // Not a sale complete event (maybe canceled)
        return new NextResponse("IPN OK", { status: 200 });
      }
    } else {
      return new NextResponse("IPN KO NOT FROM PAYTECH", { status: 403 });
    }
  } catch (error) {
    console.error("IPN Error:", error);
    return new NextResponse("IPN Error", { status: 500 });
  }
}
