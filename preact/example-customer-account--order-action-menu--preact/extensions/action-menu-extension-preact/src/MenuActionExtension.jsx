import {render} from 'preact';

// [START menu-action.setup-target]
export default async () => {
  // [START menu-action.fetch-order-fulfillments]
  let hasFulfillments = false;

  try {
    const orderQuery = {
      query: `query Order($orderId: ID!) {
        order(id: $orderId) {
          fulfillments(first: 1) {
            nodes {
              latestShipmentStatus
            }
          }
        }
      }`,
      variables: {orderId: shopify.orderId},
    };

    const result = await fetch(
      'shopify://customer-account/api/2025-10/graphql.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderQuery),
      }
    );

    const {data} = await result.json();

    hasFulfillments = data.order.fulfillments.nodes.length !== 0;
  } catch (error) {
    console.log(error);
    hasFulfillments = false;
  }
  render(<MenuActionExtension showAction={hasFulfillments} />, document.body);
  // [END menu-action.fetch-order-fulfillments]
};
// [END menu-action.setup-target]

function MenuActionExtension({showAction}) {
  // [START menu-action.conditionally-render]
  if (!showAction) {
    return null;
  }
  // [END menu-action.conditionally-render]

  // [START menu-action.render-button]
  return <s-button>Report a problem</s-button>;
  // [END menu-action.render-button]
}
