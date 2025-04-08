import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Page, Card, ResourceList, Thumbnail, Text } from "@shopify/polaris";

// Loader function to fetch products
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            media(first: 1) {
              edges {
                node {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
          }
        }
      }
    }`
  );

  const data = await response.json();
  const products = data.data.products.edges.map(edge => edge.node);

  return { products }; // Return raw object
};


// Component to display products
export default function Products() {
  const { products } = useLoaderData();

  return (
    <Page title="Products">
      <Card>
        <ResourceList
          resourceName={{ singular: 'product', plural: 'products' }}
          items={products}
          renderItem={(product) => {
            const media = product.media.edges[0]?.node?.image;
            const mediaMarkup = media ? (
              <Thumbnail
                source={media.url}
                alt={media.altText || 'Product Image'}
              />
            ) : null;

            return (
              <ResourceList.Item
                id={product.id}
                media={mediaMarkup}
                accessibilityLabel={`View details for ${product.title}`}
              >
                <Text variant="bodyMd" fontWeight="bold">
                  {product.title}
                </Text>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </Page>
  );
}
