// import { authenticate } from "../shopify.server";

// export const action = async ({ request }) => {
//   const { shop, topic } = await authenticate.webhook(request);

//   console.log(`Received ${topic} webhook for ${shop}`);

//   return new Response();
// };

// import { authenticate } from "../shopify.server";

// export const action = async ({ request }) => {
//   const { shop, topic, payload } = await authenticate.webhook(request);

//   console.log(`Received ${topic} webhook for ${shop}`);

//   try {
//     // Send event to Mixpanel
//     await fetch("https://api.mixpanel.com/track/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         data: btoa(
//           JSON.stringify({
//             event: "Checkout Completed",
//             properties: {
//               token: "5b1e136ab5f2e01c3ad5116151e68860", // Replace with your Mixpanel token
//             },
//           })
//         ),
//       }),
//     });

//     console.log("Checkout event sent to Mixpanel");
//   } catch (error) {
//     console.error("Error sending event to Mixpanel:", error);
//   }

//   return new Response();


// };






// Properly working webhook for checkout_Completed event

// import { authenticate } from "../shopify.server";

// export const action = async ({ request }) => {
//   const { shop, topic } = await authenticate.webhook(request);

//   console.log(`Received ${topic} webhook for ${shop}`);

//   try {
//     const mixpanelEvent = {
//       event: "Purchased",
//       properties: {
//         token: "5b1e136ab5f2e01c3ad5116151e68860", // Replace with your actual Mixpanel token
//       },
//     };

//     await fetch("https://api.mixpanel.com/track/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         data: btoa(JSON.stringify(mixpanelEvent)),
//       }),
//     });

//     console.log("checkout_completed event sent to Mixpanel");
//   } catch (error) {
//     console.error("Error sending event to Mixpanel:", error);
//   }

//   return new Response();
// };







// import { authenticate } from "../shopify.server";

// export const action = async ({ request }) => {
//   const { shop, topic, payload } = await authenticate.webhook(request);

//   console.log(`Received ${topic} webhook for ${shop}`);

//   try {
//     // If you're sending clientId from headers or JSON body
//     const mixpanelEvent = {
//       event: topic || "checkout_completed",
//       properties: {
//         token: "5b1e136ab5f2e01c3ad5116151e68860",
//         distinct_id: clientId,
//         shop,
//         topic,
//         order_id: payload?.id,
//         total_price: payload?.total_price,
//         email: payload?.email,
//         created_at: payload?.created_at,
//         $insert_id: payload?.id,
//         time: Math.floor(new Date(payload?.created_at || Date.now()).getTime() / 1000),
//       },
//     };

//     await fetch("https://api.mixpanel.com/track/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         data: btoa(JSON.stringify(mixpanelEvent)),
//       }),
//     });

//     console.log(`${topic} event sent to Mixpanel`);
//   } catch (error) {
//     console.error("Error sending event to Mixpanel:", error.message, error.stack);
//   }

//   return new Response();
// };





// Checking if i can call the client if from the apiVersion.store-clientId.js

import { authenticate } from "../shopify.server";
import { clientIdStore } from "./api.store-clientId"; // Import the clientIdStore and send it as discinct_id
export const action = async ({ request }) => {
  const { shop, topic } = await authenticate.webhook(request);

  console.log(`Received ${topic} webhook for ${shop}`);

  try {
    // Retrieve the latest clientId from the in-memory store
    const latestClientId = clientIdStore.length > 0 ? clientIdStore[clientIdStore.length - 1] : null;

    console.log("🔗 Associated clientId:", latestClientId);

    // Prepare the Mixpanel event
    const mixpanelEvent = {
      event: "Purchased",
      properties: {
        token: "5b1e136ab5f2e01c3ad5116151e68860", // Replace with your actual Mixpanel token
        distinct_id: latestClientId || "unknown", // Use clientId if available, otherwise fallback
        shop,
        topic,
      },
    };

    // Send the event to Mixpanel
    await fetch("https://api.mixpanel.com/track/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        data: btoa(JSON.stringify(mixpanelEvent)),
      }),
    });

    console.log("checkout_completed event sent to Mixpanel");
  } catch (error) {
    console.error("Error sending event to Mixpanel:", error);
  }

  return new Response();
};