// import { register } from "@shopify/web-pixels-extension";

// register(({ analytics }) => {
//     analytics.subscribe('all_standard_events', (event) => {
//         const { timestamp, id, name, clientId } = event;

//         // Logs the full event so you can inspect what's available
//         console.log('Event', event);

//         // Logs client ID (this is usually available)
//         // console.log('Client ID:', clientId);

//     });
// });

// Sending events to mixpanel

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





//Get IP to set as distinct ID. This will be last resort

// import { register } from "@shopify/web-pixels-extension";

// register(({ analytics }) => {
//   analytics.subscribe('all_standard_events', async (event) => {
//     const { timestamp, id, name, clientId } = event;

//     console.log('Event:', event);
//     console.log('Client ID:', clientId);

//     try {
//       const res = await fetch('https://api.ipify.org?format=json');
//       const data = await res.json();
//       console.log("Fetched Browser IP:", data.ip);
//     } catch (error) {
//       console.error("Error fetching browser IP:", error);
//     }
//   });
// });










import { register } from '@shopify/web-pixels-extension';
register(({ analytics }) => {
  analytics.subscribe('all_standard_events', async (event) => {
    const { clientId } = event;

    try {
      await fetch('https://f594-36-50-79-204.ngrok-free.app/api/store-clientId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: btoa(JSON.stringify({ clientId }))
        }),
      });      
      
    } catch (error) {
      console.error("Event Error:", error);
    }
  });
});
