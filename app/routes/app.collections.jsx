import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Page, Card, ResourceList, Thumbnail, Text } from "@shopify/polaris";

// Loader function to fetch collections
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    query {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
            }
          }
        }
      }
    }`
  );

  const data = await response.json();
  const collections = data.data.collections.edges.map(edge => edge.node);

  return { collections }; // Return raw object
};

// Component to display collections
export default function Collections() {
  const { collections } = useLoaderData();

  return (
    <Page title="Collections">
      <Card>
        <ResourceList
          resourceName={{ singular: 'collection', plural: 'collections' }}
          items={collections}
          renderItem={(collection) => {
            const media = collection.image;
            const mediaMarkup = media ? (
              <Thumbnail
                source={media.url}
                alt={media.altText || 'Collection Image'}
              />
            ) : null;

            return (
              <ResourceList.Item
                id={collection.id}
                media={mediaMarkup}
                accessibilityLabel={`View details for ${collection.title}`}
              >
                <Text variant="bodyMd" fontWeight="bold">
                  {collection.title}
                </Text>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </Page>
  );
}

