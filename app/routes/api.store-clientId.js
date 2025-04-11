import { json } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

export async function action({ request }) {
  const body = await request.json();
  const decoded = JSON.parse(Buffer.from(body.data, "base64").toString("utf-8"));
  const { clientId } = decoded;

  console.log("📥 Received clientId:", clientId);

  const logFilePath = path.resolve("logs/clientId.log");

  await fs.appendFile(logFilePath, `clientId: ${clientId}\n`);
  return json({ success: true });
}

// 👇 Add this to handle CORS preflight
export async function loader() {
  return new Response("OK", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Or restrict to your origin
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
