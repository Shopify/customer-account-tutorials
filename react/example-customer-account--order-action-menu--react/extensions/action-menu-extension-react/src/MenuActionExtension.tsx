import { useEffect, useState } from "react";
import {
  Button,
  reactExtension,
} from "@shopify/ui-extensions-react/customer-account";

// [START menu-action.setup-target]
export default reactExtension(
  "customer-account.order.action.menu-item.render",
  async (api) => {
    const { orderId } = api;
    // [START menu-action.fetch-order-fulfillments]
    let hasFulfillments = false;
    try {
      const orderQuery = {
        query: `query {
          order(id: "${orderId}") {
            fulfillments(first: 1) {
              nodes {
                latestShipmentStatus
              }
            }
          }
        }`,
      };
      const result = await fetch(
        "shopify://customer-account/api/2024-10/graphql.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderQuery),
        }
      );
      const { data } = await result.json();
      hasFulfillments = data.order.fulfillments.nodes.length !== 0;
    } catch (error) {
      console.log(error);
      hasFulfillments = false;
    }
    return <MenuActionExtension showAction={hasFulfillments} />;
    // [END menu-action.fetch-order-fulfillments]
  }
);
// [END menu-action.setup-target]

function MenuActionExtension({ showAction }: { showAction: boolean }) {
  // [START menu-action.conditionally-render]
  if (!showAction) {
    return null;
  }
  // [END menu-action.conditionally-render]

  // [START menu-action.render-button]
  return <Button>Report a problem</Button>;
  // [END menu-action.render-button]
}
