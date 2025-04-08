// import {register} from "@shopify/web-pixels-extension";

// register(({ analytics, browser, init, settings }) => {
//     // Bootstrap and insert pixel script tag here

//     // Subscribe to all standard events
//     analytics.subscribe('all_standard_events', (event) => {
//         console.log('Event', event);

//         const clientId = event.clientId;
//         localStorage.setItem("ClientId", clientId); // <-- Correct method to store
//         console.log(clientId);
//     });
// });


// import { register } from '@shopify/web-pixels-extension';
// register(({ analytics }) => {
//   analytics.subscribe('all_standard_events', async (event) => {
//     const { timestamp, id, name, clientId } = event;

//     try {
//       const response = await fetch('https://api.mixpanel.com/track/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//         body: new URLSearchParams({
//           data: btoa(
//             JSON.stringify({
//               event: name,
//               properties: {
//                 distinct_id: clientId,
//                 token: "5b1e136ab5f2e01c3ad5116151e68860",
//               },
//             })
//           ),
//         }),
//       });

//       const responseData = await response.text();
//       console.log("Mixpanel Event Response:", responseData);
//     } catch (error) {
//       console.error("Mixpanel Event Error:", error);
//     }
//   });
// });

// import { register } from "@shopify/web-pixels-extension";
// import { createEvent } from "../api/prisma.server";

// register(({ analytics }) => {
//     analytics.subscribe('all_standard_events', async (event) => {  
//         if (event) {
//             console.log('Event', event);

//             try {
//                 await createEvent({
//                     eventName: event.name
//                 });
//             } catch (error) {
//                 console.error("Error saving event:", error);
//             }
//         }
//     });
// });



// import { register } from "@shopify/web-pixels-extension";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// register(({ analytics }) => {
//   analytics.subscribe("page_viewed", async (event) => {
//     console.log("Received event:", event);

//     try {
//       async function main() { 
//         const savedEvent = await prisma.event.create({
//           data: { eventName: "page_viewed" }
//         });
//         console.log("Saved event:", savedEvent);
//       }

//       await main();  // Ensure async function is executed properly

//       console.log("Event successfully saved to database");
//     } catch (error) {
//       console.error("Failed to save event:", error);
//     }
//   });
// });

// index.js
// import { register } from "@shopify/web-pixels-extension";

// register(({ analytics }) => {
//   analytics.subscribe("page_viewed", async (event) => {
//     console.log("Received event:", event);

//     try {
//       await fetch("prisma.js", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ eventName: event.name }),
//       });
//       console.log("Event sent to backend");
//     } catch (error) {
//       console.error("Error sending event:", error.message);
//     }
//   });
// });


// import { register } from "@shopify/web-pixels-extension";
// import upsertEvent from "../../../app/prismaClient";

// register(({ analytics, browser, init, settings }) => {
//   // Subscribe to all standard Shopify events
//   analytics.subscribe("all_standard_events", async (event) => {
//     try {
//       const eventName = event.name; // Extract event name dynamically
//       console.log("Captured Event:", eventName);

//       if (eventName) {
//         await upsertEvent(eventName); // Send the event name to Prisma
//       }
//     } catch (error) {
//       console.error("Error processing event:", error);
//     }
//   });
// });
