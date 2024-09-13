import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

import {parseGid} from '@shopify/admin-graphql-api-utilities';

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

export default function Index() {
  const loader = useLoaderData();


  console.log(loader)

  const collections = [{
    name: "Loyalty collection",
    handle: "deep-linked-collection"
  }]

  return (
    <Page>
      <TitleBar title="Collections deep link" />
      <BlockStack gap="500">
        {collections && (
          collections.map((collection) => (
            <>
            <Text as="h1" variant="headingLg">{collection.name}</Text>
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
                              <Button variant="primary" onClick={() => {open(`shopify://admin/settings/checkout/editor/profiles/${parseGid(profile.id)}?context=apps&app=160076070913&collection=${collection.handle}`, '_top')}}>
                                See collection
                              </Button>
                            </InlineStack>
                          </InlineStack>
                        </Box>
                      </Layout.Section>
                    ))}
                  </Layout>
            </Card>
          </>
          ))
        )}
      </BlockStack>
    </Page>
  );
}
