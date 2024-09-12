import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  Box,
  InlineStack,
  Badge,
  Button,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const checkoutProfiles = await admin.graphql(
    `#graphql
     query queryCheckoutProfiles {
      checkoutProfiles(first: 10) {
        nodes {
          id
          name
          isPublished
        }
      }
     }
    `
  )

  const checkoutProfilesJson = await checkoutProfiles.json();

  return json({
    checkoutProfiles: checkoutProfilesJson.data.checkoutProfiles
  });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];

  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();


  return json({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  });
};

export default function Index() {
  const fetcher = useFetcher();
  const loader = useLoaderData();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";


  console.log(loader)

  return (
    <Page>
      <TitleBar title="Collections deep link" />
      <BlockStack gap="500">
        <Card>
          <Layout>
            {loader.checkoutProfiles.nodes.map((profile) => (
              <Layout.Section key={profile.id}>
                <Box paddingBlock="500" paddingInline="200" borderWidth="050" borderRadius="200" borderColor="border">
                  <InlineStack wrap={false} align="space-between" blockAlign="center">
                    <InlineStack gap="200">
                        <Text>
                          {profile.name}
                        </Text>
                        {profile.isPublished && (
                          <Badge tone="success">Live</Badge>
                        )}
                    </InlineStack>
                    <InlineStack align="end">
                      <Button variant="primary">
                        See collection
                      </Button>
                    </InlineStack>
                  </InlineStack>
                </Box>
              </Layout.Section>
            ))}
          </Layout>
        </Card>
      </BlockStack>
    </Page>
  );
}
