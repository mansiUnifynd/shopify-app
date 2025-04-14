// import { json } from "@remix-run/node";
// import fs from "fs/promises";
// import path from "path";

// export async function action({ request }) {
//   const body = await request.json();
//   const decoded = JSON.parse(Buffer.from(body.data, "base64").toString("utf-8"));
//   const { clientId } = decoded;

//   console.log("📥 Received clientId:", clientId);

//   const logFilePath = path.resolve("logs/clientId.log");

//   await fs.appendFile(logFilePath, `clientId: ${clientId}\n`);
//   return json({ success: true });
// }

// // 👇 Add this to handle CORS preflight
// export async function loader() {
//   return new Response("OK", {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*", // Or restrict to your origin
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }


// This code below extrtacts the clientId and stores it in memory that is later called inside webhooks.app.orders-create.jsx and sent to mmixpanel
import { json } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";

// Temporary in-memory store for clientId
const clientIdStore = [];

export async function action({ request }) {
  const body = await request.json();
  const decoded = JSON.parse(Buffer.from(body.data, "base64").toString("utf-8"));
  const { clientId } = decoded;

  console.log("📥 Received clientId:", clientId);

  // Save clientId to a log file
  const logFilePath = path.resolve("logs/clientId.log");
  await fs.appendFile(logFilePath, `clientId: ${clientId}\n`);

  // Save clientId to the in-memory store
  clientIdStore.push(clientId);

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

// Export the in-memory store so it can be accessed elsewhere
export { clientIdStore };