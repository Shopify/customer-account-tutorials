import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import prisma from "./db.server";
import type { AdminApiContext } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import type { ShopifyRestResources } from "@shopify/shopify-api";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.October24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  // [START create-metafield-definition.after-auth]
  hooks: {
    afterAuth: async ({ admin, session }) => {
      await shopify.registerWebhooks({ session });

      try {
        const metafield = await getMetafield(admin);

        if (metafield == null) {
          await createMetafield(admin);
        }
      } catch (error: any) {
        if ("graphQLErrors" in error) {
          console.error(error.graphQLErrors);
        } else {
          console.error(error);
        }

        throw error;
      }
    },
  },
  // [END create-metafield-definition.after-auth]
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.Unstable;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;

// [START create-metafield-definition.get-metafield]
async function getMetafield(admin: AdminApiContext<ShopifyRestResources>) {
  const response = await admin.graphql(getMetafieldQuery, {
    variables: {
      key: "nickname",
      namespace: "$app:preferences",
      ownerType: "CUSTOMER",
    },
  });

  const json = await response.json();
  return json.data?.metafieldDefinitions.nodes[0];
}

const getMetafieldQuery = `#graphql
query getMetafieldDefinition($key: String!, $namespace: String!, $ownerType: MetafieldOwnerType!) {
  metafieldDefinitions(first: 1, key: $key, namespace: $namespace, ownerType: $ownerType) {
    nodes {
      id
    }
  }
}
`;
// [END create-metafield-definition.get-metafield]

// [START create-metafield-definition.create-metafield]
async function createMetafield(admin: AdminApiContext<ShopifyRestResources>) {
  const response = await admin.graphql(createMetafieldMutation, {
    variables: {
      definition: {
        access: {
          customerAccount: "READ_WRITE",
          admin: "PRIVATE"
        },
        key: "nickname",
        name: "The customer's preferred name",
        namespace: "$app:preferences",
        ownerType: "CUSTOMER",
        type: "single_line_text_field",
      },
    },
  });

  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
}

const createMetafieldMutation = `#graphql
mutation metafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      key
      namespace
    }
    userErrors {
      field
      message
    }
  }
}
`;
// [END create-metafield-definition.create-metafield]
