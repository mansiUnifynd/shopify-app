import upsertEvent from "./prismaClient.js";

async function sendEvent() {
  await upsertEvent("add-to-cart"); // Example event
}

sendEvent();
