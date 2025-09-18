import '@shopify/ui-extensions/preact';
import {render} from 'preact';

export default async () => {
  render(<CustomerFulfillmentDetailsDelivery />, document.body);
};

// [START order-status-static.build-ui]
function CustomerFulfillmentDetailsDelivery() {
  return (
    <s-stack direction="block" gap="base">
      <s-divider />
      <s-text>Tell us how we did for a chance to win 1000 points</s-text>
      <s-stack direction="block" max-inline-size="150">
        <s-button>Write a review</s-button>
      </s-stack>
    </s-stack>
  );
}
// [END order-status-static.build-ui]
