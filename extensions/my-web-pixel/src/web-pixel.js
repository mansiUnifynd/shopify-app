import { json } from "@remix-run/node";

export const action = async ({ request }) => {
  const session = await authenticate.admin(request); // Shopify auth function
  const shop = session.shop;
  const accessToken = session.accessToken;

  const response = await fetch(`https://${shop}/admin/api/2023-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({
      query: `
        mutation {
          webPixelCreate(webPixel: { settings: "{\\"accountID\\":\\"123\\"}" }) {
            userErrors {
              code
              field
              message
            }
            webPixel {
              settings
              id
            }
          }
        }
      `,
    }),
  });

  const result = await response.json();
  return json(result);
};
