import { useEffect, useState } from "react";
import {
  Button,
  reactExtension,
  useApi,
} from "@shopify/ui-extensions-react/customer-account";

// [START menu-action.setup-target]
export default reactExtension(
  "customer-account.order.action.menu-item.render",
  ( ) => <MenuActionExtension />
);
// [END menu-action.setup-target]

function MenuActionExtension( ) {
  const {orderId} = useApi<"customer-account.order.action.menu-item.render">()
  const [showAction, setShowAction] = useState(false)

  // [START menu-action.fetch-order-fulfillments]
  useEffect(() => {
    const orderQuery = {
      query: `query {
        order(id: "${orderId}") {
          fulfillments(first: 10) {
            nodes {
              latestShipmentStatus
            }
          }
        }
      }`
    };

    fetch("shopify://customer-account/api/latest/graphql.json",
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderQuery),
        }).then((response) => response.json())
        .then(({data}) => {
          setShowAction(data.order.fulfillments.nodes.length !== 0)
        }).catch(console.error);
  }, [orderId]);
  // [END menu-action.fetch-order-fulfillments]

  // [START menu-action.conditionally-render]
  if (!showAction) return null;
  // [END menu-action.conditionally-render]

  // [START menu-action.render-button]
  return (
    <Button>Report a problem</Button>
  );
  // [END menu-action.render-button]
}
